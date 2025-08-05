'use client';
import React, { useState, useEffect } from 'react';
import {
    Card, Row, Col, Button, Modal, Form, Input,
    Typography, message, Space
} from 'antd';
import {
    CreditCardOutlined, IdcardOutlined,
    SendOutlined, InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

type LangType = 'en' | 'zh' | 'ms';

const languages: Record<LangType, {
    confirmButton: string;
    cancelButton: string;
    confirmApplicationInformation: string;
    addressee: string;
    subject: string;
    content: string;
    AdditionalInformation: string;
    mrtCardTitle: string;
    mrtCardDesc: string;
    bankCardTitle: string;
    bankCardDesc: string;
    studentCardTitle: string;
    studentCardDesc: string;
}> = {
    en: {
        confirmButton: "Confirm",
        cancelButton: "Cancel",
        confirmApplicationInformation: "Confirm application information",
        addressee: "Addressee:",
        subject: "Subject:",
        content: "Content:",
        AdditionalInformation: "Please add your personal information in the email",
        mrtCardTitle: "MRT Card Application",
        mrtCardDesc: "Apply for a student discount MRT card to enjoy transportation discounts",
        bankCardTitle: "Bank Card Application",
        bankCardDesc: "Apply for a bank recommendation letter to quickly apply for a local bank card",
        studentCardTitle: "Student ID Card Application",
        studentCardDesc: "Upload your ID photo and signed Full Offer to apply for or reissue a student ID card",
    },
    zh: {
        confirmButton: "确认",
        cancelButton: "取消",
        confirmApplicationInformation: "确认申请信息",
        addressee: "收件人:",
        subject: "主题:",
        content: "内容:",
        AdditionalInformation: "请在邮件中补充您的个人信息",
        mrtCardTitle: "地铁卡申请",
        mrtCardDesc: "用于申请学生优惠地铁卡，享受交通折扣",
        bankCardTitle: "银行卡申请",
        bankCardDesc: "用于申请银行推荐函，快速办理本地银行卡",
        studentCardTitle: "学生卡申请",
        studentCardDesc: "需上传证件照及带签名的Full Offer，补办或新办学生卡",
    },
    ms: {
        confirmButton: "Pengesahan",
        cancelButton: "Batal",
        confirmApplicationInformation: "Pengesahan Maklumat Permohonan",
        addressee: "Penerima:",
        subject: "Subjek:",
        content: "Konten:",
        AdditionalInformation: "Sila tambahkan maklumat peribadi di dalam e-mel",
        mrtCardTitle: "Permohonan Kad MRT",
        mrtCardDesc: "Mohon kad MRT diskaun pelajar untuk menikmati diskaun pengangkutan",
        bankCardTitle: "Permohonan Kad Bank",
        bankCardDesc: "Mohon surat rujukan bank untuk mohon kad bank tempatan dengan cepat",
        studentCardTitle: "Permohonan Kad Pelajar",
        studentCardDesc: "Muat naik foto pengenalan dan Full Offer yang ditandatangani untuk mohon atau buat semula kad pelajar",
    }
};

const emailTemplates: Record<string, {
    to: string;
    subject: string;
    body: string;
}> = {
    mrtCard: {
        to: "registrykd@segi.edu.my",
        subject: "FOR STUDENT STATUS LETTER (MRT Card)",
        body: "Dear Sir /Madam,\n\nFull Name: \nPassport Number: \nStudent ID: \n I would like to request a confirmation letter from SEGi to apply for a student MRT card.\n\nBest Regard,"
    },
    bankCard: {
        to: "registrykd@segi.edu.my",
        subject: "FOR BANK RECOMMENDATION LETTER APPLICATION",
        body: "Dear Sir /Madam,\n\nFull Name: \nPassport Number: \nStudent ID: \nNationality: \nBank Name: \n\nApply for a bank card to apply for recommended credit for paying rent and daily living expenses\n\nBest Regard,"
    },
    studentCard: {
        to: "registrykd@segi.edu.my",
        subject: "Apply for new student id card",
        body: "Dear Sir /Madam,\n\nThe following is my detailed information.\n1. FULL NAME :\n2. PASSPORT :\n\nTHANK YOU FOR HELP"
    }
};

const MaterialApplication = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTemplate, setCurrentTemplate] = useState<{
        to: string;
        subject: string;
        body: string;
    } | null>(null);
    const [currentLanguage, setCurrentLanguage] = useState<LangType>('en');
    const [selectedLanguage, setSelectedLanguage] = useState(languages.en);
    const [form] = Form.useForm();

    useEffect(() => {
        // const browserLang = navigator.language;
        let lang: LangType = 'en';
        // if (browserLang.startsWith('zh')) {
        //     lang = 'zh';
        // } else if (browserLang.startsWith('ms')) {
        //     lang = 'ms';
        // }
        setCurrentLanguage(lang);
        setSelectedLanguage(languages[lang]);
    }, []);

    const handleLanguageChange = (lang: LangType) => {
        setCurrentLanguage(lang);
        setSelectedLanguage(languages[lang]);
    };

    const handleOpenModal = (templateKey: keyof typeof emailTemplates) => {
        const template = emailTemplates[templateKey];
        setCurrentTemplate(template);
        form.setFieldsValue({
            to: template.to,
            subject: template.subject,
            content: template.body
        });
        setIsModalVisible(true);
    };

    const handleSendEmail = () => {
        form.validateFields()
            .then(values => {
                const mailtoUrl = `mailto:${values.to}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(values.content)}`;
                window.open(mailtoUrl, '_blank');
                setIsModalVisible(false);
                message.success('邮件已打开，请检查并发送');
            })
            .catch(() => {
                message.error('请完善邮件信息');
            });
    };

    const serviceItems = [
        {
            key: 'mrtCard',
            title: selectedLanguage.mrtCardTitle,
            description: selectedLanguage.mrtCardDesc,
            icon: <CreditCardOutlined style={{ fontSize: '24px', color: '#165DFF' }} />,
            color: '#e6f7ff',
            bgColor: '#165DFF'
        },
        {
            key: 'bankCard',
            title: selectedLanguage.bankCardTitle,
            description: selectedLanguage.bankCardDesc,
            icon: <CreditCardOutlined style={{ fontSize: '24px', color: '#36D399' }} />,
            color: '#f6ffed',
            bgColor: '#36D399'
        },
        {
            key: 'studentCard',
            title: selectedLanguage.studentCardTitle,
            description: selectedLanguage.studentCardDesc,
            icon: <IdcardOutlined style={{ fontSize: '24px', color: '#FF9F43' }} />,
            color: '#fff7e6',
            bgColor: '#FF9F43'
        }
    ];

    return (
        <div className="material-application-container" style={{ padding: '2rem 0' }}>
            <div style={{ textAlign: 'right', marginBottom: '1rem', paddingRight: '1rem' }}>
                <select
                    value={currentLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as LangType)}
                    style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        border: '1px solid #d9d9d9',
                        backgroundColor: '#fff'
                    }}
                >
                    <option value="en">English</option>
                    <option value="zh">中文</option>
                    <option value="ms">Bahasa Melayu</option>
                </select>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Convenient Service Application</Title>
                <Paragraph>With just one click, you can complete various campus service applications without cumbersome processes</Paragraph>
            </div>

            <Row gutter={[16, 24]}>
                {serviceItems.map(item => (
                    <Col xs={24} sm={12} md={8} key={item.key}>
                        <Card hoverable style={{
                            transition: 'all 0.3s ease',
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                        }}>
                            <div style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '8px',
                                backgroundColor: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '1rem'
                            }}>
                                {item.icon}
                            </div>
                            <Meta
                                title={<Title level={4}>{item.title}</Title>}
                                description={item.description}
                            />
                            <div style={{ marginTop: '1rem' }}>
                                <Button
                                    type="primary"
                                    block
                                    icon={<SendOutlined />}
                                    onClick={() => handleOpenModal(item.key as keyof typeof emailTemplates)}
                                    style={{ backgroundColor: item.bgColor }}
                                >
                                    立即申请
                                </Button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title={selectedLanguage?.confirmApplicationInformation}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        {selectedLanguage.cancelButton}
                    </Button>,
                    <Button
                        key="send"
                        type="primary"
                        onClick={handleSendEmail}
                        icon={<SendOutlined />}
                    >
                        {selectedLanguage.confirmButton}
                    </Button>
                ]}
                destroyOnHidden
                maskClosable={false}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="to"
                        label={selectedLanguage.addressee}
                        rules={[{ required: true, message: '请输入收件人邮箱' }]}
                    >
                        <Input readOnly style={{ backgroundColor: '#f5f5f5' }} />
                    </Form.Item>

                    <Form.Item
                        name="subject"
                        label={selectedLanguage.subject}
                        rules={[{ required: true, message: '请输入邮件主题' }]}
                    >
                        <Input readOnly style={{ backgroundColor: '#f5f5f5' }} />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label={selectedLanguage.content}
                        rules={[{ required: true, message: '请输入邮件内容' }]}
                    >
                        <Input.TextArea rows={8} />
                    </Form.Item>

                    <Form.Item>
                        <Paragraph type="secondary" style={{ marginBottom: 0, display: 'flex', alignItems: 'center' }}>
                            <InfoCircleOutlined style={{ marginRight: '4px' }} />
                            {selectedLanguage.AdditionalInformation}
                        </Paragraph>
                    </Form.Item>
                </Form>
            </Modal>

            
        </div>
    );
};

export default MaterialApplication;
