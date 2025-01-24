import IZone from "./IZone";

export default interface IActivity {
  id: number,
  title: string,
  description: string,
  type: string,
  Zone: IZone,
}
