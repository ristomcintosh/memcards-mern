import { Request, Response } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const { UNSPLASH_API_ID } = process.env;

const getImages = async (searchTerm: string, page: number) =>
  axios.get(
    `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&orientation=landscape`,
    {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_API_ID}`
      }
    }
  );

export default async (req: Request, res: Response) => {
  const { searchTerm, page } = req.query;
  if (!searchTerm || !page)
    return res.status(400).send('Search term and page number is required');
  if (searchTerm.length < 3)
    return res.status(400).send('Search term should be 3 or more chr');
  try {
    const images = await getImages(searchTerm, page);
    return res.status(200).json(images.data);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};
