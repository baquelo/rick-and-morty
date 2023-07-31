import axios from 'axios';
import { defineStore } from 'pinia';

export enum Status {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown',
}

export enum Specie {
    Human = 'Human',
    Alien = 'Alien',
    Humanoid = 'Humanoid',
    Mythological = 'Mythological Creature',
    Animal = 'Animal',
    Robot = 'Robot',
    Cronenberg = 'Cronenberg',
    Poopybutthole = 'Poopybutthole',
    MythologicalHumanoid = 'Mythological Humanoid',
    Disease = 'Disease',
    Parasite = 'Parasite',
    Planet = 'Planet',
    HumanAlien = 'Humanoid Alien',
    RobotAlien = 'Robot Alien',
    AnimalAlien = 'Animal Alien',
    Unknown = 'unknown',
}

export enum Gender {
    Male = 'Male',
}

export interface Origin {
    name: string;
    url: string;
}

export interface Location {
    name: string;
    url: string;
}

export interface Character {
    id: number;
    name: string;
    status: Status;
    species: Specie;
    type: string;
    gender: Gender;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
    created: string;
}

export enum StatusQuery {
    Alive = 'Alive',
    Dead = 'Dead',
    Unknown = 'unknown',
    All = 'all',
}

export interface CharacterQuery {
    page?: number;
    name?: string;
    status?: StatusQuery;
}

export interface Info {
    pages: number;
}

export const useCharacterStore = defineStore('character', {
    state: () => ({
        characters: [] as Character[],
        info: {} as Info,
    }),
    actions: {
        async getCharacters(params?: CharacterQuery) {
            this.characters = [];
            this.info = {} as Info;

            const query: CharacterQuery = {};

            if (params?.page && params?.page > 1) {
                query.page = params.page;
            }
            if (params?.name) {
                query.name = params.name;
            }
            if (params?.status && params.status !== StatusQuery.All) {
                query.status = params.status;
            }

            const urlParams = new URLSearchParams(query as any);
            const result = await axios.get(
                `https://rickandmortyapi.com/api/character?${urlParams.toString()}`,
            );

            this.characters = result.data.results;
            this.info = result.data.info;

            return result.data;
        },
    },
});
