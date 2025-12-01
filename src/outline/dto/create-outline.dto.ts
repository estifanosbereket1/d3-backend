import { ApiProperty } from "@nestjs/swagger";
import { SectionStye, Status } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateOutlineDto {
    @ApiProperty({
        description: "Title of the outline",
        example: "Technical Approach Overview",
    })
    @IsString()
    header: string;

    @ApiProperty({
        description: "Section of the outline",
        enum: SectionStye,
        example: SectionStye.TechnicalApproach,
    })
    @IsEnum(SectionStye)
    section: SectionStye;

    @ApiProperty({
        description: "Current status of the outline",
        enum: Status,
        example: Status.Pending,
    })
    @IsEnum(Status)
    status: Status;

    @ApiProperty({
        description: "Target value for the outline",
        example: 3,
    })
    @IsInt()
    target: number;

    @ApiProperty({
        description: "Maximum limit for the outline",
        example: 50,
    })
    @IsInt()
    limit: number;

    @ApiProperty({
        description: "ID of the member this outline belongs to",
        example: "b6RZ5zm6OA5kkEO2yLbuDj7VS42VZSFx",
    })
    @IsString()
    memberId: string;
}
