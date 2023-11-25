import { EntityWithTraits } from "./../@types/traits";
import Entity from "../Entity";
import SpriteSheet from "../SpriteSheet";
import { FAST_DRAG, MARIO_INIT_SIZE, SLOW_DRAG } from "../defines";
import { loadSpriteSheet } from "../loaders";
import Go from "../traits/Go";
import Jump from "../traits/Jump";
import Killable from "../traits/Killable";
import Physics from "../traits/Physics";
import Solid from "../traits/Solid";
import Stomper from "../traits/Stomper";
import { loadAudioBoard } from "../loaders/audio";
import AudioBoard from "../AudioBoard";

export const loadMario = async function (audioContext: AudioContext) {
    const sprite = await loadSpriteSheet("mario");
    const audio = await loadAudioBoard("mario", audioContext);

    return createMarioFactory(sprite, audio);

    // return Promise.all([
    //     loadSpriteSheet("mario"),
    //     loadAudioBoard("mario", audioContext)
    // ]).then(([sprite, audio]) => {
    //     return createMarioFactory(sprite)
    // })
};

const createMarioFactory = function (sprite: SpriteSheet, audio: AudioBoard) {
    const runAnim = sprite.animations.get("run") as (distance: number) => AnimationFrames;

    function routeFrame(mario: EntityWithTraits): MarioFrames {
        if (mario.jump.falling) return "jump";

        if (mario.go.distance > 0) {
            if ((mario.vel.x > 0 && mario.go.dir < 0) || (mario.vel.x < 0 && mario.go.dir > 0)) {
                return "break";
            }

            return runAnim(mario.go.distance) as MarioAnimationFrames;
        }

        return "idle";
    }

    function setTurboState(this: EntityWithTraits, turboOn: boolean) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(this: EntityWithTraits, context: CanvasRenderingContext2D) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity() as EntityWithTraits;
        mario.audio = audio;

        mario.size.set(MARIO_INIT_SIZE.w, MARIO_INIT_SIZE.h);

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Stomper());
        mario.addTrait(new Killable());

        mario.killable!.removeAfter = 0;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    };
};
