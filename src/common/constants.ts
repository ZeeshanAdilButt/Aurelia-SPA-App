export class constants {

  public BaseURI: string;
  public ParticipantCreateURI: string;
  public ParticipantGetAllURI: string;
  public ParticipantDeleteURI: string;
  public ParticipantUpdateURI: string;
  public ParticipantGetURI: string;

  constructor() {

    this.BaseURI = "https://localhost:44384/api/v1/";

    this.ParticipantCreateURI = this.BaseURI;
    this.ParticipantGetURI = this.BaseURI + "{applicantId}";
    this.ParticipantUpdateURI = this.BaseURI;
    this.ParticipantDeleteURI = this.BaseURI;
    this.ParticipantGetAllURI = this.BaseURI;
  }

}
