import { Injectable } from "@angular/core";
import { GeneralService } from "../services/general.service";

@Injectable({
  providedIn: "root"
})
export class TokenVerification {
  secretOrPrivateKey = "jwt";

  constructor(private genSer: GeneralService) {}

  verifyToken(token) {
    // return jwt.verify(token, (error, decoded) => {
    //   if (error) {
    //     console.log(error, "logginh");
    //     this.genSer.expiredToken.next(error);
    //     return false;
    //   }
    //   if (Object.keys(decoded).length !== 6) {
    //     console.log(decoded, "decode");
    //     return false;
    //   }
    //   console.log("oli");
    //   this.genSer.expiredToken.next("");
    //   return true;
    // });
    if (token) {
      return true;
    } else {
      this.genSer.expiredToken.next("Token expired");
      return false;
    }
  }
}
