// Create a new PixiJS application
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xFFFFFF
});
$('#scene-renderer').append(app.view);

window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// Load a texture and add a sprite
PIXI.Assets.load('https://mentalgames.org/asset/images/logo.png').then(texture => {
    const bunny = new PIXI.Sprite(texture);

    // Center the sprite's anchor point
    bunny.anchor.set(0.5);

    // Position the bunny in the center of the canvas
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    // Add the bunny to the stage
    app.stage.addChild(bunny);

    // Add a rotating animation
    app.ticker.add(() => {
        bunny.rotation += 0.01;
    });
});