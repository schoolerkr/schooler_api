import {
  Controller,
  Get,
  Query,
  Param,
  Logger,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SchoolService } from './school.service';
import { schoolInfoDto } from './dto/schoolInfo.dto';

@ApiTags('학교 정보 API')
@Controller('school')
export class SchoolController {
  private readonly logger = new Logger(SchoolController.name);

  constructor(private readonly schoolService: SchoolService) {}

  @Get('search')
  @ApiOperation({
    summary: '학교 정보 검색',
    description: '학교명을 통해 학교 정보를 검색합니다.',
  })
  @ApiOkResponse({
    description: '학교 정보 검색 결과',
    type: [schoolInfoDto],
  })
  async searchSchool(
    @Query('name') schoolName: string,
  ): Promise<schoolInfoDto[]> {
    return await this.schoolService.searchSchool(schoolName);
  }

  @Get(':id')
  @ApiOperation({
    summary: '학교 정보 확인',
    description: '학교 코드를 통해 학교 정보를 얻습니다.',
  })
  @ApiOkResponse({
    description: '학교 정보',
    type: schoolInfoDto,
  })
  async getSchoolInfo(@Param('id') schoolCode: string): Promise<schoolInfoDto> {
    try {
      return await this.schoolService.getSchoolInfo(schoolCode);
    } catch (e) {
      throw new HttpException(
        e,
        HttpStatus[(e.code as string) || 'INTERNAL_SERVER_ERROR'],
      );
    }
  }
}
