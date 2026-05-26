export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    PROVIDER = "PROVIDER",
};

export enum PlanName {
  TRIAL = "TRIAL",
  STARTER = "STARTER",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
  NO_SUBSCRIPTION = "NO_SUBSCRIPTION"
};

export enum Boolean {
    TRUE = "true",
    FALSE = "false"
};

export enum FileType {
    PNG="image/png",
    JPEG="image/jpeg",
    JPG="image/jpg"
};

export enum EventStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PENDING = "PENDING",
    RETRY = "RETRY",
}