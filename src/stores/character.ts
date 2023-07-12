import axios from 'axios';
import { defineStore } from 'pinia';
import type { S } from 'vitest/dist/types-198fd1d9.js';

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

export const useCharacterStore = defineStore('character', {
    state: () => ({
        characters: [] as Character[],
    }),
    actions: {
        async getCharacters(page: number = 1) {
            this.characters = [];

            const result = await axios.get(
                `https://rickandmortyapi.com/api/character?page=${page}`,
            );

            this.characters = result.data.results;

            return result.data;
        },
    },
});
