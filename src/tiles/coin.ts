import { tileCollisionContextType } from "../TileCollider";

function handle({ entity, match, resolver }: tileCollisionContextType) {
    if (!entity.traits.has("player")) return;

    entity.getTrait("player")!.addCoins(1);
    const grid = resolver.matrix;
    grid.delete(match.indexX, match.indexY);
}

const coin = [handle, handle];

export default coin;
