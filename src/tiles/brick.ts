import { tileCollisionContextType } from "../TileCollider";
import { Sides } from "../defines";

function handleX({ entity, match }: tileCollisionContextType) {
    if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
            entity.obstruct(Sides.RIGHT, match);
        }
    } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
            entity.obstruct(Sides.LEFT, match);
        }
    }
}

function handleY({ entity, match, resolver, gameContext, level }: tileCollisionContextType) {
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstruct(Sides.BOTTOM, match);
        }
    } else if (entity.vel.y < 0) {
        if (entity.traits.has("player")) {
            const grid = resolver.matrix;
            grid.delete(match.indexX, match.indexY);

            const goomba = gameContext.entityFactory.goomba();
            goomba.vel.set(50, -400);
            goomba.pos.set(entity.pos.x, match.y1);
            level.entities.add(goomba);
        }

        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match);
        }
    }
}

const brick = [handleX, handleY];

export default brick;
