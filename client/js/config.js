/**
 * Contains configurable, static flags and constants that never change during
 * runtime.
 */
cyberpunks.Config = {};

// Whether to render the body parts using skeleton sprites instead of
// rectangles.
cyberpunks.Config.USE_SKELETON_SPRITE = false;

// Whether to show various debug info on screen.
cyberpunks.Config.SHOW_DEBUG_MESSAGING = true;
cyberpunks.Config.SHOW_DEBUG_CLIMBER_GRAPHICS = true;

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
cyberpunks.Config.CAMERA_DEADZONE_WIDTH = 200;

// The amount of gravity in the y-direction.
cyberpunks.Config.GRAVITY_Y = 1000;

// The size of the climber.
cyberpunks.Config.CLIMBER_SIZE = 100;

// Whether the climber should collide with its own body parts.
cyberpunks.Config.CLIMBER_COLLIDES_WITH_ITSELF = true;
// Whether the climber should collide with holds.
cyberpunks.Config.CLIMBER_COLLIDES_WITH_HOLDS = false;

// The granularity of hit points for a climber's draggable limbs. These hit
// points are used to test for overlap with holds when determining whether the
// limb should be fixed to a hold on drag end.
cyberpunks.Config.CLIMBER_HIT_POINT_GRANULARITY = 3;

// Whether the climber releases holds based on the forces acting on each limb.
cyberpunks.Config.CLIMBER_FALLS_BASED_ON_FORCES = false;