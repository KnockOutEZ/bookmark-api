/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Bookmark, Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async getBookmarks(user) {
    return (
        await this.prisma.bookmark.findMany({
            where: {
              userID: user.id,
            },
          })
    );
  }

  async getBookmarkById(user, id: number) {
    const numbID = Number(id)
    return (
        await this.prisma.bookmark.findUnique({
            where: {
              id:numbID
            },
          })
    );
  }

  async createBookmark(user, dto: CreateBookmarkDto) {
    try{
      return (
        await this.prisma.bookmark.create({
            data: {
              userID: user.id,
              ...dto,
            },
          })
    )
    }catch(error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'There is a unique constraint violation',
          );
        }
      }
      throw `${error}`;
    }
  }

  async EditBookmark(user, dto: EditBookmarkDto, id:number) {
    const numbID = Number(id)
    try{
      return (
        await this.prisma.bookmark.update({
            where:{
              id:numbID
            },
            data: {
              userID: user.id,
              ...dto,
            },
          })
    )
    }catch(error){
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'There is a unique constraint violation',
          );
        }
      }
      throw `${error}`;
    }
  }

  async deleteBookmark(user, id: number) {
    const numbID = Number(id)
    return ( await this.prisma.bookmark.delete({
        where:{
            id: numbID
        }
      }))
  }
}
