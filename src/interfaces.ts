export interface QueryFilter {
  company?: String;
  role?: String;
  location?: String;
  posted?: Date;
  sponsorship?: Boolean;
  citizenship?: Boolean;
  open?: Boolean;
}

export interface Internship {
  id: number;
  company: string;
  role: string;
  location: {
    city: string;
    state: string;
  } | null;
  posted: Date;
  sponsorship: boolean | null;
  citizenship: boolean | null;
  open: boolean | null;
  app_link: string;
}
