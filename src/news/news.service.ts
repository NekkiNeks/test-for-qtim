import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';
import crypto from 'node:crypto';

@Injectable()
export class NewsService {
  
  // Новость в единственном числе на английском все равно "news" 😕
  news: News[] = []

  create(createNewsDto: CreateNewsDto) {
    const createdNews = new News(createNewsDto.title, createNewsDto.text);

    this.news.push(createdNews);

    console.log(`Новость coздана: \n`, createdNews);
    
    return createdNews;
  }

  findAll() {
    return this.news;
  }

  findOne(id: string) {
    const news: News | undefined = this.news.find(news => news.id === id);
    if (!news) throw new BadRequestException('Новость с таким ID не была найдена');
    return news;
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    // В реальности это нужно было бы выполнять в транзакции, но мы тут даже БД не используем, так что не важно...
    const index = this.news.findIndex(news => news.id === id);
    
    if (index < 0) throw new BadRequestException('Новость с таким ID не была найдена');

    if (updateNewsDto.title) this.news[index].text = updateNewsDto.title;
    if (updateNewsDto.text) this.news[index].text = updateNewsDto.text;
  }

  remove(id: string) {
    this.news = this.news.filter(news => news.id !== id);
  }
}
