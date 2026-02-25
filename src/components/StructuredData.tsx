export default function StructuredData() {
    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Muhammad Nabi Rahmani",
        "alternateName": "codewithnabi",
        "url": "https://codewithnabi.dev",
        "image": [
            "https://codewithnabi.dev/assets/branding/profile.jpg",
            "https://codewithnabi.dev/assets/branding/youtube-logo.png"
        ],
        "logo": "https://codewithnabi.dev/assets/branding/youtube-logo.png",
        "jobTitle": "Flutter Developer",
        "description": "Flutter Developer crafting beautiful mobile experiences with clean code and intuitive design",
        "email": "codewithnabi@gmail.com",
        "sameAs": [
            "https://github.com/Nabi-Rahmani",
            "https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/",
            "https://x.com/nabirahmani_dev"
        ],
        "knowsAbout": [
            "Flutter Development",
            "Dart Programming",
            "Mobile App Development",
            "Firebase",
            "UI/UX Design",
            "Cross-platform Development"
        ],
        "hasOccupation": {
            "@type": "Occupation",
            "name": "Flutter Developer",
            "description": "Mobile application developer specializing in Flutter framework"
        }
    };

    const brandData = {
        "@context": "https://schema.org",
        "@type": "Brand",
        "name": "codewithnabi",
        "alternateName": "Muhammad Nabi Rahmani",
        "url": "https://codewithnabi.dev",
        "logo": "https://codewithnabi.dev/assets/branding/youtube-logo.png",
        "image": "https://codewithnabi.dev/assets/branding/youtube-logo.png",
        "description": "Personal brand of Muhammad Nabi Rahmani, Flutter Developer",
        "sameAs": [
            "https://github.com/Nabi-Rahmani",
            "https://www.linkedin.com/in/muhammad-nabi-rahmani-%F0%9F%87%B5%F0%9F%87%B8-8945b21ba/",
            "https://x.com/nabirahmani_dev"
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personData, null, 2),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(brandData, null, 2),
                }}
            />
        </>
    );
}
