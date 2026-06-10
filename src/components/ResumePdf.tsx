import { resume } from "../data/resume";

function shortenUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}

export default function ResumePdf() {
  const { profile, about, skills, experience, projects, education } = resume;
  const fullName = `${profile.firstName} ${profile.lastName}`;

  return (
    <div className="resume-pdf print-only">
      <header className="resume-header">
        <div className="resume-header-inner">
          <img
            src={profile.photo}
            alt={fullName}
            className="resume-photo"
          />
          <div className="resume-header-text">
            <h1 className="resume-name">{fullName}</h1>
            <p className="resume-title">{profile.title}</p>
            <p className="resume-contact">
              {profile.location} ·{" "}
              <a href={`mailto:${profile.email}`} className="resume-contact-link">
                {profile.email}
              </a>
              {" · "}
              {profile.phone}
            </p>
            <p className="resume-contact">
              <a href={profile.linkedin} className="resume-contact-link">
                {shortenUrl(profile.linkedin)}
              </a>
              {" · "}
              <a href={profile.github} className="resume-contact-link">
                {shortenUrl(profile.github)}
              </a>
            </p>
            <p className="resume-contact">
              Portfolio:{" "}
              <a href={profile.website} className="resume-contact-link">
                {shortenUrl(profile.website)}
              </a>
            </p>
          </div>
        </div>
      </header>

      <section className="resume-section">
        <h2 className="resume-section-title">Summary</h2>
        {about.paragraphs.map((paragraph, i) => (
          <p key={i} className="resume-text">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Skills</h2>
        <div className="resume-badges">
          {skills.map((skill) => (
            <span key={skill.name} className="resume-badge">
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Experience</h2>
        {experience.map((job) => (
          <div key={`${job.title}-${job.company}`} className="resume-entry">
            <div className="resume-entry-row">
              <div className="resume-entry-main">
                <p className="resume-entry-title">{job.title}</p>
                <p className="resume-entry-subtitle">{job.company}</p>
              </div>
              <p className="resume-entry-date">{job.period}</p>
            </div>
            {job.location && <p className="resume-meta">{job.location}</p>}
            <p className="resume-text">{job.description}</p>
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Projects</h2>
        {projects.map((project) => (
          <div key={project.name} className="resume-entry">
            <div className="resume-entry-row">
              <div className="resume-entry-main">
                <div className="resume-project-title-line">
                  <p className="resume-entry-title">{project.name}</p>
                  {project.highlight && project.highlightLabel && (
                    <span className="resume-badge resume-badge-accent">
                      {project.highlightLabel}
                    </span>
                  )}
                  {project.status && !project.highlight && (
                    <span className="resume-badge resume-badge-muted">
                      {project.status}
                    </span>
                  )}
                </div>
                <p className="resume-entry-subtitle">{project.role}</p>
              </div>
              <p className="resume-entry-date">{project.period}</p>
            </div>
            <p className="resume-text">{project.description}</p>
            <div className="resume-badges resume-badges-compact">
              {project.technologies.map((tech) => (
                <span key={tech} className="resume-badge resume-badge-tech">
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <p className="resume-link">{shortenUrl(project.link)}</p>
            )}
          </div>
        ))}
      </section>

      <section className="resume-section">
        <h2 className="resume-section-title">Education</h2>
        {education.map((entry) => (
          <div key={`${entry.degree}-${entry.school}`} className="resume-entry">
            <div className="resume-entry-row">
              <div className="resume-entry-main">
                <p className="resume-entry-title">{entry.degree}</p>
                <p className="resume-entry-subtitle">{entry.school}</p>
              </div>
              <p className="resume-entry-date">{entry.period}</p>
            </div>
            <p className="resume-meta">{entry.honors}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
