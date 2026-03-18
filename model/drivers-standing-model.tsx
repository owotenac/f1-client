import { ConstructorProps } from "./constructor-model";
import { DriverProps } from "./driver-model";

export type DriversStandingProps = {
    Driver: DriverProps,
    Constructors: ConstructorProps,
    points: number,
    position: number,
    position_text: string,
    wins: number
};
