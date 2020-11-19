export function getAgainst(req: Request, res: Response) {
    try {
        const name = req.params.name && req.params.name || undefined;
        if(!name){ throw "Se requiere el nombre del pokemon."}
        const pokemons = PokemonsService.getAgainst(name);
        res.status(200).json(pokemons);
    } catch (error) {
        res.status(400).send(error);
    }
}