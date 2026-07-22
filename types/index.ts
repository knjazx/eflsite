export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: 'user' | 'igl' | 'admin';
  avatar?: string;
  team?: string;
  teamId?: string;
  discordId?: string;
  steamId?: string;
  createdAt: string;
  teamDeletedAt?: string | null;
}

export interface Team {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  country?: string;
  rating: number;
  description?: string;
  logo?: string;
  ownerId: string;
  createdAt: string;
}

export interface Player {
  id: string;
  nick: string;
  name: string;
  team: string;
  role?: string;
  country?: string;
  rating: number;
  photo?: string;
  userId?: string;
  stats: {
    kd: number;
    hs: number;
    adr: number;
    matches: number;
    wins: number;
  };
}

export interface Tournament {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  tier: 1 | 2 | 3;
  prizePool?: string;
  format?: string;
  participantsCount?: number;
  banner?: string;
  createdAt: string;
}

export interface Match {
  id: string;
  tournamentId?: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  map?: string;
  streamLink?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  preview: string;
  image?: string;
  author: string;
  date: string;
  views?: number;
}

export interface Group {
  id: string;
  name: string;
  tournamentId?: string;
  teams: GroupTeam[];
}

export interface GroupTeam {
  name: string;
  wins: number;
  losses: number;
  points?: number;
}

export interface Veto {
  id: string;
  matchId: string;
  map: string;
  team: string;
  action: 'ban' | 'pick';
  order: number;
}

export interface Award {
  id: string;
  playerId: string;
  playerNick: string;
  tournamentId?: string;
  type: 'mvp' | 'top-fragger' | 'clutch-master' | 'ace';
  title: string;
  description?: string;
  date: string;
}

export type Collection = 
  | 'users'
  | 'teams'
  | 'players'
  | 'tournaments'
  | 'matches'
  | 'news'
  | 'groups'
  | 'vetos'
  | 'awards';
