import { ChildModel } from './child.model';

export class DataModel {
  id: string;
  int: number;
  float: number;
  color: string;
  child: ChildModel;

  constructor(
    id: string,
    int: number,
    float: number,
    color: string,
    child: ChildModel
  ) {
    this.id = id;
    this.int = int;
    this.float = float;
    this.color = color;
    this.child = child;
  }
}
