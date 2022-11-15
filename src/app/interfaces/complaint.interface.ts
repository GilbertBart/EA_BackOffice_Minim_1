import { Point } from "./point.interface"
import { Route } from "./route.interface"
import { User } from "./user.interface"

export interface Complaint{
	_id: string,
	user: User,
	dayOfComplaint: Date,
	
}
