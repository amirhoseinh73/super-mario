import { EntityWithTraits } from "../../@types/traits";
import { Trait } from "../Entity";

export default class Stomper extends Trait {
    bounceSpeed: number;

    constructor() {
        super("stomper");

        this.bounceSpeed = 400;
    }

    public bounce(us: EntityWithTraits, them: EntityWithTraits) {
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    public collides(us: EntityWithTraits, them: EntityWithTraits): void {
        if (!them.killable || them.killable.dead) return;

        if (us.vel.y > them.vel.y) {
            this.bounce(us, them);
        }
    }
}