class AlertModel {
    constructor(
      id: {
        type: number,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      type:  {
        type: string,
        allowNull: true,
      },
      magnitude: {
        type: number,
        allowNull: true,
      },
      id_zone: {
        type: string,
        allowNull: false,
      },
      water_level: {
        type: string,
        allowNull: false,
      },
      alert_typeId: {
        type: string,
        allowNull: false,
      },
      disaster_start: {
        type: string,
        allowNull: false,
      },
      disaster_end: {
        type: string,
        allowNull: false,
      }
    ){}
  };
  
  export default AlertModel;