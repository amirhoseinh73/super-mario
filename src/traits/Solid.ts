import Entity from "../Entity";
import Trait from "../Trait";
import { Sides } from "../defines";

export default class Solid extends Trait {
    obstructs: boolean;

    constructor() {
        super("solid");
        this.obstructs = true;
    }

    public obstruct(entity: Entity, side: Symbol, match: MatchTiles): void {
        if (!this.obstructs) return;

        if (side === Sides.BOTTOM) {
            entity.bounds.bottom = match.y1;
            entity.vel.y = 0;
        } else if (side === Sides.TOP) {
            entity.bounds.top = match.y2;
            entity.vel.y = 0;
        } else if (side === Sides.LEFT) {
            entity.bounds.left = match.x2;
            entity.vel.x = 0;
        } else if (side === Sides.RIGHT) {
            entity.bounds.right = match.x1;
            entity.vel.x = 0;
        }
    }
}
