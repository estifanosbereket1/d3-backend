import { SectionStye, Status } from "@prisma/client"

export class CreateOutlineDto {
    header: string
    section: SectionStye
    status: Status
    target: number
    limit: number
    memberId: string
}
