/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookmarkService } from './bookmark.service';
import { Request } from 'express';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(AuthGuard('JWT-AUTH'))
@Controller('bookmark')
export class BookmarkController {
  constructor(private BookmarkService: BookmarkService) {}
  @Get()
  getBookmarks(@Req() req: Request) {
    return this.BookmarkService.getBookmarks(req.user);
  }

  @Get(':id')
  getBookmarkById(@Req() req: Request, @Param('id') id: number) {
    return this.BookmarkService.getBookmarkById(req.user, id);
  }

  @Post()
  createBookmark(@Req() req: Request, @Body() dto: CreateBookmarkDto) {
    return this.BookmarkService.createBookmark(req.user, dto);
  }

  @Patch(':id')
  EditBookmark(@Req() req: Request, @Body() dto: EditBookmarkDto,@Param('id') id: number) {
    return this.BookmarkService.EditBookmark(req.user, dto, id);
  }

  @Delete(':id')
  deleteBookmark(@Req() req: Request, @Param('id') id: number) {
    return this.BookmarkService.deleteBookmark(req.user, id);
  }
}
