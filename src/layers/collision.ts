import Camera from "../Camera";
import Entity from "../Entity";
import Level from "../Level";
import TileResolver from "../TileResolver";

const createEntityLayer = function (entities: Set<Entity>) {
    return function drawBoundingBox(context: CanvasRenderingContext2D, camera: Camera) {
        context.strokeStyle = "red";
        entities.forEach(entity => {
            context.beginPath();
            context.rect(
                entity.bounds.left - camera.pos.x,
                entity.bounds.top - camera.pos.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });
    };
};

const createTileCandidateLayer = function (tileResolver: TileResolver) {
    const resolvedTiles: Position[] = [];

    const tileSize = tileResolver.tileSize;

    const getByIndexOriginal = tileResolver.getByIndex;
    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.push({ x, y });
        return getByIndexOriginal.call(tileResolver, x, y);
    };

    return function drawTileCandidates(context: CanvasRenderingContext2D, camera: Camera) {
        context.strokeStyle = "blue";
        resolvedTiles.forEach(({ x, y }) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.pos.x,
                y * tileSize - camera.pos.y,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        resolvedTiles.length = 0;
    };
};

export function createCollisionLayer(level: Level) {
    if (!level.tileCollider) return;
    const drawTileCandidates = level.tileCollider.resolvers.map(createTileCandidateLayer);

    const drawBoundingBoxes = createEntityLayer(level.entities);

    return function drawCollision(context: CanvasRenderingContext2D, camera: Camera) {
        drawTileCandidates.forEach(draw => draw(context, camera));
        drawBoundingBoxes(context, camera);
    };
}
