import { IsString, IsNotEmpty, IsOptional, IsIn} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  @IsIn(['active', 'completed'])
  status?: string; 


  @IsString()
  userId:string;

}
