//think about unify fronend interfaces with backend.

export default interface GameConfig {
    categories: string[],
    characters: string[],
    settings: Settings,
}

interface Settings {
    maxPlayerCount: number,
    roundsQuantity: number,
    playtime: number,
}