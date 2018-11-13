/**
 * Contains configurable, static flags and constants that never change during
 * runtime.
 */
cyberpunks.Config = {};

// Whether to render the body parts using skeleton sprites instead of
// rectangles.
cyberpunks.Config.USE_SKELETON_SPRITE = false;

// Whether to print on screen the forces acting on the hands/feet.
cyberpunks.Config.SHOW_DEBUG_FORCES = false;

// The dimensions of the screen on the window.
cyberpunks.Config.SCREEN_WIDTH = 1000;
cyberpunks.Config.SCREEN_HEIGHT = 600;

// The dimensions of the game world, possibly larger than what is shown on
// screen.
cyberpunks.Config.GAME_WIDTH = 1920;
cyberpunks.Config.GAME_HEIGHT = 1920;

// How far the camera is zoomed.
// 1.0 is normal, 0.5 is more zoomed out, 2.0 is more zoomed in.
cyberpunks.Config.CAMERA_SCALE = 0.75;

// The width of the camera's deadzone. If the climber is within this margin from
// the edge of the camera, the camera will scroll.
cyberpunks.Config.CAMERA_DEADZONE_WIDTH = 100;

// The amount of gravity in the y-direction.
cyberpunks.Config.GRAVITY_Y = 1000;

// The size of the climber. A bigger number is a bigger size.
cyberpunks.Config.CLIMBER_SIZE = 100;
