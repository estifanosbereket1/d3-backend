import { ApiProperty } from "@nestjs/swagger";
import { SectionStye, Status } from "@prisma/client";

export class OutlineItemResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    header: string;

    @ApiProperty({ enum: SectionStye })
    section: SectionStye;

    @ApiProperty({ enum: Status })
    status: Status;

    @ApiProperty()
    target: number;

    @ApiProperty()
    limit: number;

    @ApiProperty({ nullable: true })
    reviewerId: string | null;

    @ApiProperty({ nullable: true })
    reviewer: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}

export class OutlineListResponseDto {
    @ApiProperty({ type: [OutlineItemResponseDto] })
    items: OutlineItemResponseDto[];

    @ApiProperty()
    total: number;
}




export class CreateOutlineResponseDto {
    @ApiProperty({ enum: Status })
    status: Status;

    @ApiProperty()
    header: string;

    @ApiProperty({ enum: SectionStye })
    section: SectionStye;

    @ApiProperty()
    target: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    memberId: string;

    @ApiProperty()
    id: string;

    @ApiProperty()
    organizationId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
