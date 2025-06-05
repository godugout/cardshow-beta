
import { CardStyle, TextStyle } from './cardTypes';

export interface CardTemplate {
  id: string;
  name: string;
  description?: string;
  thumbnail: string; // Required in this version
  thumbnailUrl?: string;
  category: string;
  isOfficial?: boolean;
  popularity?: number;
  designDefaults?: { // Optional in this version
    cardStyle: Partial<CardStyle>;
    textStyle?: Partial<TextStyle>;
    effects?: string[];
  };
  previewUrl?: string;
  sport?: string;
  style?: string;
}
