
/* eslint-disable jsx-a11y/alt-text */
"use client"

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#112233',
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 5,
    },
    text: {
        fontSize: 11,
        lineHeight: 1.5,
        marginBottom: 5,
    },
    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 15,
        textTransform: 'uppercase',
        color: '#333',
    },
    jobContainer: {
        marginBottom: 15,
    },
    jobTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 11,
        fontStyle: 'italic',
        color: '#444',
    },
    date: {
        fontSize: 10,
        color: '#666',
        marginBottom: 3,
    },
    skillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
    },
    skill: {
        backgroundColor: '#f0f0f0',
        padding: '3px 6px',
        fontSize: 10,
        borderRadius: 4,
    }
});

export const CVDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.title}>Steev Thomas</Text>
                <Text style={styles.subtitle}>Software Engineer</Text>
                <Text style={styles.text}>steevthomaswk@gmail.com • 0899751377 • Dublin, Ireland</Text>
            </View>

            <View>
                <Text style={styles.text}>
                    Motivated MSc Computing student with 3+ years of web development experience across remote and in-person roles. Strong background in JavaScript ecosystems, particularly Node.js, and hands-on experience with AWS cloud services. Proven ability to build scalable, secure applications and integrate third-party APIs. Eager to contribute to high-impact backend systems in a collaborative, cloud-native environment.
                </Text>
            </View>

            <View>
                <Text style={styles.heading}>Work Experience</Text>

                <View style={styles.jobContainer}>
                    <Text style={styles.jobTitle}>Web Developer (Part Time)</Text>
                    <Text style={styles.company}>Ledivano Italia, Dublin, Ireland</Text>
                    <Text style={styles.date}>Sep 2024 – Present</Text>
                    <Text style={styles.text}>• Maintained and optimized a dynamic WordPress website, ensuring accurate stock updates and custom templates, which improved operational efficiency and customer experience.</Text>
                    <Text style={styles.text}>• Enhanced site performance and usability through front-end adjustments and debugging, contributing to faster page loads and increased user engagement.</Text>
                    <Text style={styles.text}>• Tech stack: WordPress, PHP, HTML, CSS, Git</Text>
                </View>

                <View style={styles.jobContainer}>
                    <Text style={styles.jobTitle}>Full Stack Developer - Remote</Text>
                    <Text style={styles.company}>Stride Real Estate LLC, Dallas, Texas, United States</Text>
                    <Text style={styles.date}>Feb 2022 – Jan 2024</Text>
                    <Text style={styles.text}>• Built and maintained Angular and React applications for real estate operations, improving the overall user experience by implementing features like blog page, updating user and agent dashboard and intuitive agent workflows.</Text>
                    <Text style={styles.text}>• Added data visualization features such as &quot;Year at a Glance&quot; charts, helping agents make faster, data-driven decisions.</Text>
                    <Text style={styles.text}>• Contributed to the early development of KOSEApp — an ambitious platform aimed at enabling instant property purchases via web and React Native apps.</Text>
                    <Text style={styles.text}>• Leveraged AWS services for deployment and cloud-based scaling, ensuring consistent performance and reliability for a growing user base.</Text>
                    <Text style={styles.text}>• Tech stack: Angular, React, React Native, Node.js, AWS, Git</Text>
                </View>

                <View style={styles.jobContainer}>
                    <Text style={styles.jobTitle}>WordPress Developer</Text>
                    <Text style={styles.company}>Winsoft Solutions, Kochi, India</Text>
                    <Text style={styles.date}>Mar 2021 – Feb 2022</Text>
                    <Text style={styles.text}>• Delivered full-scale WordPress sites using premium themes and plugins.</Text>
                    <Text style={styles.text}>• Managed deployments via cPanel and Plesk for various client projects.</Text>
                    <Text style={styles.text}>• Tech stack: WordPress, MySQL, HTML, CSS, cPanel, Plesk</Text>
                </View>
            </View>

            <View>
                <Text style={styles.heading}>Skills</Text>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Languages & Frameworks</Text>
                    <Text style={styles.text}>JavaScript (Node.js, Angular, React), HTML5/CSS</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Databases</Text>
                    <Text style={styles.text}>SQL (MSSQL), NoSQL (MongoDB, DynamoDB)</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Cloud & DevOps</Text>
                    <Text style={styles.text}>AWS (EC2, S3), Git, cPanel, Plesk</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Back-End & API Integration</Text>
                    <Text style={styles.text}>RESTful APIs, Authentication, Data Feeds</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Testing & Tools</Text>
                    <Text style={styles.text}>Automated Testing (familiarity with Jest), Debugging Tools</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>Currently Exploring</Text>
                    <Text style={styles.text}>Docker, CI/CD Pipelines, Jest</Text>
                </View>
            </View>

            <View>
                <Text style={styles.heading}>Education</Text>
                <View style={styles.jobContainer}>
                    <Text style={styles.jobTitle}>MSc in Computing Science</Text>
                    <Text style={styles.company}>Griffith College, Dublin</Text>
                    <Text style={styles.date}>Jan 2024 – Jul 2025 (Expected)</Text>
                </View>
                <View style={styles.jobContainer}>
                    <Text style={styles.jobTitle}>B.E in Computer Science Engineering</Text>
                    <Text style={styles.company}>DMI Engineering College, Kanyakumari</Text>
                    <Text style={styles.date}>Jan 2016 – Dec 2020</Text>
                    <Text style={styles.text}>CGPA 6.5</Text>
                </View>
            </View>
        </Page>
    </Document>
);
