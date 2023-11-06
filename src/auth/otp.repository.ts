// otp.repository.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpRepository {
  private otpStore = new Map<string, string>(); 

    saveOtp(email: string, otp: string): void {
        this.otpStore.set(email, otp);
    }

    getOtp(email: string): string | undefined {
        return this.otpStore.get(email);
    }

    clearOtp(email: string): void {
        this.otpStore.delete(email);
    }
}
