export const loadResources = async () => {
    return await import("../storage/resources.json")
        .then(module => module.default)
}