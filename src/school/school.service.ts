import Neis, { DataNotFoundError } from 'neis.ts';
import { Injectable, Logger } from '@nestjs/common';

import { Temporal } from '@js-temporal/polyfill';
import { schoolInfoDto } from './dto/schoolInfo.dto';
import { APIError } from 'src/common/dto/APIError.dto';

@Injectable()
export class SchoolService {
  private readonly logger = new Logger(SchoolService.name);
  private readonly neis = new Neis({
    // key: process.env.NEIS_API_KEY,
  });

  async searchSchool(schoolName: string): Promise<schoolInfoDto[]> {
    try {
      const schools = await this.neis.getSchool({
        SCHUL_NM: schoolName,
      });

      return schools.map<schoolInfoDto>((school) => {
        return {
          eduDeptCode: school.ATPT_OFCDC_SC_CODE,
          eduDeptName: school.ATPT_OFCDC_SC_NM,
          schoolCode: school.SD_SCHUL_CODE,
          schoolName: school.SCHUL_NM,
          engSchoolName: school.ENG_SCHUL_NM || undefined,
          schoolKindName: school.SCHUL_KND_SC_NM,
          localCityName: school.LCTN_SC_NM,
          localOrgName: school.JU_ORG_NM,
          categoryName: school.FOND_SC_NM,
          postalCode: school.ORG_RDNZC.replaceAll('-', '').replaceAll(' ', ''),
          address: {
            line1: school.ORG_RDNMA || '',
            line2: school.ORG_RDNDA,
          },
          telNumber: school.ORG_TELNO,
          website: school.HMPG_ADRES,
          coEduType: school.COEDU_SC_NM,
          faxNumber: school.ORG_FAXNO,
          highGradeType: school.HS_SC_NM
            ? school.HS_SC_NM.replaceAll(' ', '')
            : null,
          hasIndustrialClass: school.INDST_SPECL_CCCCL_EXST_YN
            ? school.INDST_SPECL_CCCCL_EXST_YN === 'Y'
              ? true
              : false
            : null,
          highSchoolType: school.HS_GNRL_BUSNS_SC_NM,
          specialHighSchoolType: school.SPCLY_PURPS_HS_ORD_NM || null,
          admissionType: school.ENE_BFE_SEHF_SC_NM || null,
          dayNightType: school.DGHT_SC_NM || null,
          foundedDate: school.FOND_YMD.replace(
            /^(\d{4})(\d\d)(\d\d)$/,
            '$1-$2-$3T00:00:00+09:00[Asia/Seoul]',
          ),
          foundDay: school.FOAS_MEMRD.replace(
            /^(\d{4})(\d\d)(\d\d)$/,
            '$1-$2-$3T00:00:00+09:00[Asia/Seoul]',
          ),
          updatedDate: Temporal.ZonedDateTime.from(
            school.LOAD_DTM.replace(
              /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
              '$1-$2-$3T$4:$5:$6+09:00[Asia/Seoul]',
            ),
          ).toString(),
        };
      });
    } catch (error) {
      if (error instanceof DataNotFoundError) {
        return [];
      }

      throw error;
    }
  }

  async getSchoolInfo(schoolCode: string): Promise<schoolInfoDto> {
    try {
      const school = await this.neis.getSchoolOne({
        SD_SCHUL_CODE: schoolCode,
      });

      return {
        eduDeptCode: school.ATPT_OFCDC_SC_CODE,
        eduDeptName: school.ATPT_OFCDC_SC_NM,
        schoolCode: school.SD_SCHUL_CODE,
        schoolName: school.SCHUL_NM,
        engSchoolName: school.ENG_SCHUL_NM || undefined,
        schoolKindName: school.SCHUL_KND_SC_NM,
        localCityName: school.LCTN_SC_NM,
        localOrgName: school.JU_ORG_NM,
        categoryName: school.FOND_SC_NM,
        postalCode: school.ORG_RDNZC.replaceAll('-', '').replaceAll(' ', ''),
        address: {
          line1: school.ORG_RDNMA || '',
          line2: school.ORG_RDNDA,
        },
        telNumber: school.ORG_TELNO,
        website: school.HMPG_ADRES,
        coEduType: school.COEDU_SC_NM,
        faxNumber: school.ORG_FAXNO,
        highGradeType: school.HS_SC_NM
          ? school.HS_SC_NM.replaceAll(' ', '')
          : null,
        hasIndustrialClass: school.INDST_SPECL_CCCCL_EXST_YN
          ? school.INDST_SPECL_CCCCL_EXST_YN === 'Y'
            ? true
            : false
          : null,
        highSchoolType: school.HS_GNRL_BUSNS_SC_NM,
        specialHighSchoolType: school.SPCLY_PURPS_HS_ORD_NM || null,
        admissionType: school.ENE_BFE_SEHF_SC_NM || null,
        dayNightType: school.DGHT_SC_NM || null,
        foundedDate: school.FOND_YMD.replace(
          /^(\d{4})(\d\d)(\d\d)$/,
          '$1-$2-$3T00:00:00+09:00[Asia/Seoul]',
        ),
        foundDay: school.FOAS_MEMRD.replace(
          /^(\d{4})(\d\d)(\d\d)$/,
          '$1-$2-$3T00:00:00+09:00[Asia/Seoul]',
        ),
        updatedDate: Temporal.ZonedDateTime.from(
          school.LOAD_DTM.replace(
            /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
            '$1-$2-$3T$4:$5:$6+09:00[Asia/Seoul]',
          ),
        ).toString(),
      };
    } catch (error) {
      if (error instanceof DataNotFoundError) {
        throw new APIError(
          'NOT_FOUND',
          error.message.slice(error.message.indexOf(' ') + 1),
        );
      }

      throw error;
    }
  }
}
