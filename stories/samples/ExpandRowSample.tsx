import React, { useMemo } from 'react';
import { faker, fakerFA } from '@faker-js/faker';

export type SampleLocale = "en" | "fa";

type Props = {
  locale?: SampleLocale,
  seed?: number
}

const labels = {
  en: {
    email: "Email",
    phone: "Phone",
    city: "City",
    address: "Address",
    registrationDate: "Registration date",
    dateLocale: "en-US"
  },
  fa: {
    email: "ایمیل",
    phone: "تلفن",
    city: "شهر",
    address: "آدرس",
    registrationDate: "تاریخ عضویت",
    dateLocale: "fa-IR"
  }
} as const;

function ExpandRowSample(props: Props) {
  const locale = props.locale ?? "en";
  const text = labels[locale];
  const profile = useMemo(() => {
    const fakerInstance = locale === "fa" ? fakerFA : faker;
    fakerInstance.seed(props.seed ?? 456);
    return {
      avatar: `https://picsum.photos/seed/jb-grid-${props.seed ?? 456}/160/160`,
      role: fakerInstance.person.jobTitle(),
      company: fakerInstance.company.name(),
      email: fakerInstance.internet.email(),
      phone: fakerInstance.phone.number(),
      city: fakerInstance.location.city(),
      address: fakerInstance.location.streetAddress(),
      bio: fakerInstance.person.bio(),
      registrationDate: fakerInstance.date.past({ years: 3 }).toLocaleDateString(text.dateLocale),
    };
  }, [locale, props.seed, text.dateLocale]);

  return (
    <div className="expanded-row-sample">
      <img className="expanded-row-image" src={profile.avatar} alt="" />
      <div className="expanded-row-content">
        <div className="expanded-row-title">{profile.role}</div>
        <div className="expanded-row-subtitle">{profile.company}</div>
        <p className="expanded-row-bio">{profile.bio}</p>
        <dl className="expanded-row-info">
          <div>
            <dt>{text.email}</dt>
            <dd>{profile.email}</dd>
          </div>
          <div>
            <dt>{text.phone}</dt>
            <dd>{profile.phone}</dd>
          </div>
          <div>
            <dt>{text.city}</dt>
            <dd>{profile.city}</dd>
          </div>
          <div>
            <dt>{text.address}</dt>
            <dd>{profile.address}</dd>
          </div>
          <div>
            <dt>{text.registrationDate}</dt>
            <dd>{profile.registrationDate}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default ExpandRowSample;
