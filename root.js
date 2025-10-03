        // --- Configuration ---
        const CANVAS_WIDTH = 800;
        const CANVAS_HEIGHT = 600;
        
        // Canvas and Context setup
        const CANVAS = document.getElementById('gameCanvas');
        CANVAS.width = CANVAS_WIDTH;
        CANVAS.height = CANVAS_HEIGHT;
        const CTX = CANVAS.getContext('2d');

        // Grid and Tile Dimensions
        const GRID_WIDTH = 13;
        const GRID_HEIGHT = 10;
        const TILE_WIDTH = 120;
        const TILE_HEIGHT = 60;
        
        // Offset to center the grid on the canvas
        const X_OFFSET = CANVAS_WIDTH / 2;
        const Y_OFFSET = 50; 

        // Store game state
        const HERO_UNIT_RADIUS = 15;
        let gameState = {
            heroPosition: { x: 5, y: 5 },
            heroStats: { hp: 40, ap: 10 },
            enemyPosition: { x: GRID_WIDTH - 2, y: 1 },
            // 2D array to hold tile status: 0=default, 1=cast_range
            gridStates: Array(GRID_WIDTH).fill(0).map(() => Array(GRID_HEIGHT).fill(0)) 
        };

        // --- Isometric Conversion Functions ---

        /**
         * Converts isometric grid coordinates (x, y) to 2D screen coordinates (pixelX, pixelY).
         */
        function isoToScreen(x, y) {
            const screenX = (x - y) * (TILE_WIDTH / 2) + X_OFFSET;
            const screenY = (x + y) * (TILE_HEIGHT / 2) + Y_OFFSET;
            return { x: screenX, y: screenY };
        }

        /**
         * Converts screen coordinates (pixelX, pixelY) back to grid coordinates (x, y).
         */
        function screenToIso(pixelX, pixelY) {
            const tempX = pixelX - X_OFFSET;
            const tempY = pixelY - Y_OFFSET;

            // Invert the projection formula
            const gridY = (tempY / (TILE_HEIGHT / 2) - tempX / (TILE_WIDTH / 2)) / 2;
            const gridX = (tempY / (TILE_HEIGHT / 2) + tempX / (TILE_WIDTH / 2)) / 2;
            
            return { x: Math.floor(gridX), y: Math.floor(gridY) };
        }

        // --- Game Logic Functions ---

        /**
         * Clears all tile state flags.
         */
        function clearGridStates() {
            for (let x = 0; x < GRID_WIDTH; x++) {
                for (let y = 0; y < GRID_HEIGHT; y++) {
                    gameState.gridStates[x][y] = 0;
                }
            }
        }

        /**
         * Marks adjacent tiles as "Cast Range" (state 1).
         */
        function updateCastRange(heroX, heroY) {
            clearGridStates();
            const directions = [
                { dx: 1, dy: 0 }, { dx: -1, dy: 0 }, 
                { dx: 0, dy: 1 }, { dx: 0, dy: -1 }
            ];

            directions.forEach(({ dx, dy }) => {
                const targetX = heroX + dx;
                const targetY = heroY + dy;

                if (targetX >= 0 && targetX < GRID_WIDTH && 
                    targetY >= 0 && targetY < GRID_HEIGHT) {
                    // State 1: Cast Range (blue)
                    gameState.gridStates[targetX][targetY] = 1;
                }
            });
        }

        // --- Drawing Functions (Native Canvas) ---

        /**
         * Draws a single isometric tile diamond shape.
         */
        function drawTile(x, y, color) {
            const { x: sx, y: sy } = isoToScreen(x, y);

            CTX.beginPath();
            
            // Draw the diamond shape for the tile
            CTX.moveTo(sx, sy + TILE_HEIGHT / 2);      // Bottom corner
            CTX.lineTo(sx + TILE_WIDTH / 2, sy);       // Right corner
            CTX.lineTo(sx, sy - TILE_HEIGHT / 2);      // Top corner
            CTX.lineTo(sx - TILE_WIDTH / 2, sy);       // Left corner
            CTX.closePath();
            
            // Fill and outline
            CTX.fillStyle = color;
            CTX.strokeStyle = '#4b5563'; // Grid line color (gray-600)
            CTX.lineWidth = 1;
            
            CTX.globalAlpha = 0.7; // Tile transparency
            CTX.fill();
            CTX.globalAlpha = 1.0; 
            CTX.stroke();
        }

        /**
         * Draws the full isometric grid.
         */
        function drawGrid() {
            for (let x = 0; x < GRID_WIDTH; x++) {
                for (let y = 0; y < GRID_HEIGHT; y++) {
                    let fillColor = '#333d45'; // Default dark background color

                    // Check for state 1 (Cast Range)
                    const tileState = gameState.gridStates[x][y];
                    if (tileState === 1) {
                        fillColor = '#3b82f6'; // Light blue for Cast Range
                    }
                    
                    drawTile(x, y, fillColor);
                }
            }
        }
        
        /**
         * Draws a unit (circle and shadow) at a specific grid location.
         */
        function drawUnit(x, y, color) {
            const { x: sx, y: sy } = isoToScreen(x, y);
            const unitCenterY = sy - TILE_HEIGHT / 4; // Shift up for perspective

            // 1. Base Shadow (Ellipse)
            CTX.beginPath();
            CTX.ellipse(sx, sy + 5, HERO_UNIT_RADIUS * 0.7, HERO_UNIT_RADIUS * 0.3, 0, 0, 2 * Math.PI);
            CTX.fillStyle = 'rgba(0, 0, 0, 0.4)';
            CTX.fill();

            // 2. Main Unit Body (Circle)
            // Use native shadow for a simple soft effect, replacing Pixi's blur filter
            CTX.shadowColor = 'rgba(0, 0, 0, 0.5)';
            CTX.shadowBlur = 4;
            CTX.shadowOffsetX = 1;
            CTX.shadowOffsetY = 1;

            CTX.beginPath();
            CTX.arc(sx, unitCenterY, HERO_UNIT_RADIUS, 0, 2 * Math.PI);
            CTX.fillStyle = color;
            CTX.fill();
            
            // Reset shadow settings
            CTX.shadowColor = 'transparent';
            CTX.shadowBlur = 0;
            CTX.shadowOffsetX = 0;
            CTX.shadowOffsetY = 0;
        }

        /**
         * Draws all units (Hero and Enemy) ensuring correct isometric depth sorting.
         */
        function drawUnits() {
            // Collect units with their depth key (x + y)
            const unitsToDraw = [
                { ...gameState.heroPosition, color: '#3b82f6', depth: gameState.heroPosition.x + gameState.heroPosition.y }, // Hero (Blue)
                { ...gameState.enemyPosition, color: '#ef4444', depth: gameState.enemyPosition.x + gameState.enemyPosition.y }  // Enemy (Red)
            ];

            // Sort units by depth (lower depth draws first)
            unitsToDraw.sort((a, b) => a.depth - b.depth);

            // Draw them in the sorted order
            unitsToDraw.forEach(unit => {
                drawUnit(unit.x, unit.y, unit.color);
            });
        }

        /**
         * Draws the text status counters.
         */
        function drawStatusCounters() {
            CTX.font = 'bold 16px Inter, sans-serif';
            CTX.strokeStyle = '#1f2937'; // Stroke for better readability
            CTX.lineWidth = 2;
            CTX.fillStyle = '#ffffff'; // White text

            const hpText = `HP: ${gameState.heroStats.hp}/40`;
            const apText = `AP: ${gameState.heroStats.ap}/10`;

            // Draw HP
            CTX.strokeText(hpText, 20, 35);
            CTX.fillText(hpText, 20, 35);

            // Draw AP
            CTX.strokeText(apText, 20, 65);
            CTX.fillText(apText, 20, 65);
        }

        /**
         * Main render loop.
         */
        function render() {
            // 1. Clear the canvas
            CTX.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            
            // 2. Update game logic (calculate cast range based on hero position)
            updateCastRange(gameState.heroPosition.x, gameState.heroPosition.y);
            
            // 3. Draw all visual components in order (Tiles -> Units -> UI)
            drawGrid();
            drawUnits();
            drawStatusCounters();
        }

        // --- Interaction Handler ---

        CANVAS.addEventListener('click', (event) => {
            // Get click position relative to the canvas
            const rect = CANVAS.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top;

            const isoCoords = screenToIso(clickX, clickY);

            // Check if the calculated coordinate is within the bounds of the defined grid
            if (isoCoords.x >= 0 && isoCoords.x < GRID_WIDTH && 
                isoCoords.y >= 0 && isoCoords.y < GRID_HEIGHT) {
                
                // Only allow movement if it's within the cast range (for demonstration)
                const tileState = gameState.gridStates[isoCoords.x][isoCoords.y];
                
                // Allow movement to Cast Range (state 1) or clicking the hero's current tile (state 0)
                if (tileState === 1 || (isoCoords.x === gameState.heroPosition.x && isoCoords.y === gameState.heroPosition.y)) {
                     gameState.heroPosition = isoCoords; // Move the hero
                     render(); // Redraw the scene
                } else {
                    console.log(`Target tile (${isoCoords.x}, ${isoCoords.y}) is outside the active range.`);
                }
            } else {
                console.log("Click was outside the defined grid area.");
            }
        });

        // Initialize the game
        window.onload = function() {
            render();
        }
