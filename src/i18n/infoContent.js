/* ============================================
   Wanderly — Help Center, Terms, Privacy copy

   Long-form copy is stored per language instead
   of in the phrase dictionary so the components
   can render sections without hundreds of keys.
   English is the source and the fallback.
   ============================================ */

const en = {
  help: {
    title: 'Help Center',
    meta: 'We usually reply within one business day.',
    intro:
      'Find quick answers about bookings, payments, and travelling with Wanderly. If you still need a hand, our support team is one email away.',
    sections: [
      {
        title: 'How do I book a trip?',
        body: 'Open a destination, choose Book Now, pick your flight and passengers, then confirm. Your e-ticket appears in My Trips right away.',
      },
      {
        title: 'Can I change or cancel a booking?',
        body: 'Bookings can be cancelled from My Trips before departure. Refund eligibility depends on the airline fare rules shown at checkout.',
      },
      {
        title: 'Which currencies can I use?',
        body: 'Prices can be shown in IDR, USD, or CNY. Change the currency in Settings and every price updates instantly.',
      },
      {
        title: 'Is my payment information safe?',
        body: 'Wanderly never stores card details. Payments are processed by our PCI-compliant partner over an encrypted connection.',
      },
      {
        title: 'How do I contact support?',
        body: 'Email us at support@wanderly.app with your booking code. We reply within one business day.',
      },
    ],
    action: { label: 'Email support', href: 'mailto:support@wanderly.app' },
  },

  terms: {
    title: 'Terms and Conditions',
    meta: 'Last updated: 1 January 2026',
    intro:
      'These terms govern your use of the Wanderly app and website. By creating an account or booking a trip, you agree to them.',
    sections: [
      {
        title: 'Using Wanderly',
        body: 'You must be at least 18 years old and provide accurate account information. You are responsible for keeping your login details secure and for all activity on your account.',
      },
      {
        title: 'Bookings and payments',
        body: 'Wanderly acts as an agent for airlines, hotels, and local operators. The contract for travel is between you and the provider. Prices are shown in your selected currency and may change until a booking is confirmed.',
      },
      {
        title: 'Cancellations and refunds',
        body: 'Cancellation and refund rules are set by the travel provider and shown before you pay. Service fees are non-refundable unless required by law.',
      },
      {
        title: 'Acceptable use',
        body: 'Do not misuse the app, attempt unauthorised access, scrape content, or post unlawful or misleading material. We may suspend accounts that break these rules.',
      },
      {
        title: 'Liability',
        body: 'We work to keep information accurate but do not guarantee that every listing is error-free. To the extent permitted by law, Wanderly is not liable for indirect losses arising from your trip.',
      },
      {
        title: 'Changes to these terms',
        body: 'We may update these terms from time to time. Continued use of Wanderly after an update means you accept the revised terms.',
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    meta: 'Last updated: 1 January 2026',
    intro:
      'This policy explains what information Wanderly collects, why we collect it, and the choices you have.',
    sections: [
      {
        title: 'Information we collect',
        body: 'We collect the details you give us, such as your name, email, profile photo, and booking information. We also collect basic device and usage data to keep the app reliable.',
      },
      {
        title: 'How we use your information',
        body: 'Your data is used to create and manage bookings, personalise recommendations, send trip updates, and improve the app. We do not sell your personal data.',
      },
      {
        title: 'Sharing with partners',
        body: 'We share only what is needed with airlines, hotels, and payment processors to fulfil your booking. These partners must protect your data under their own agreements.',
      },
      {
        title: 'Storage and security',
        body: 'Data is stored on secured servers and protected with encryption in transit. We keep booking records only as long as required for legal and accounting purposes.',
      },
      {
        title: 'Your rights',
        body: 'You can view or update your profile in Settings, and you may request a copy or deletion of your data by emailing privacy@wanderly.app.',
      },
      {
        title: 'Contact us',
        body: 'Questions about this policy? Email privacy@wanderly.app and we will respond within 30 days.',
      },
    ],
    action: { label: 'Email privacy', href: 'mailto:privacy@wanderly.app' },
  },
}

const id = {
  help: {
    title: 'Pusat Bantuan',
    meta: 'Kami biasanya membalas dalam satu hari kerja.',
    intro:
      'Temukan jawaban cepat soal pemesanan, pembayaran, dan perjalanan bersama Wanderly. Kalau masih butuh bantuan, tim dukungan kami tinggal satu email jauhnya.',
    sections: [
      {
        title: 'Bagaimana cara memesan perjalanan?',
        body: 'Buka destinasi, pilih Pesan Sekarang, pilih penerbangan dan penumpang, lalu konfirmasi. E-tiketmu langsung muncul di Perjalanan Saya.',
      },
      {
        title: 'Bisakah saya mengubah atau membatalkan pemesanan?',
        body: 'Pemesanan bisa dibatalkan dari Perjalanan Saya sebelum keberangkatan. Kelayakan refund bergantung pada aturan tarif maskapai yang ditampilkan saat checkout.',
      },
      {
        title: 'Mata uang apa saja yang bisa dipakai?',
        body: 'Harga bisa ditampilkan dalam IDR, USD, atau CNY. Ubah mata uang di Pengaturan dan semua harga langsung diperbarui.',
      },
      {
        title: 'Apakah data pembayaran saya aman?',
        body: 'Wanderly tidak menyimpan detail kartu. Pembayaran diproses oleh mitra bersertifikat PCI melalui koneksi terenkripsi.',
      },
      {
        title: 'Bagaimana cara menghubungi dukungan?',
        body: 'Kirim email ke support@wanderly.app beserta kode pemesananmu. Kami membalas dalam satu hari kerja.',
      },
    ],
    action: { label: 'Email dukungan', href: 'mailto:support@wanderly.app' },
  },

  terms: {
    title: 'Syarat dan Ketentuan',
    meta: 'Terakhir diperbarui: 1 Januari 2026',
    intro:
      'Syarat ini mengatur penggunaan aplikasi dan situs Wanderly. Dengan membuat akun atau memesan perjalanan, kamu menyetujuinya.',
    sections: [
      {
        title: 'Menggunakan Wanderly',
        body: 'Kamu harus berusia minimal 18 tahun dan memberikan informasi akun yang akurat. Kamu bertanggung jawab menjaga kerahasiaan data login dan seluruh aktivitas di akunmu.',
      },
      {
        title: 'Pemesanan dan pembayaran',
        body: 'Wanderly bertindak sebagai agen untuk maskapai, hotel, dan operator lokal. Kontrak perjalanan adalah antara kamu dan penyedia. Harga ditampilkan dalam mata uang pilihanmu dan dapat berubah hingga pemesanan dikonfirmasi.',
      },
      {
        title: 'Pembatalan dan refund',
        body: 'Aturan pembatalan dan refund ditentukan oleh penyedia perjalanan dan ditampilkan sebelum kamu membayar. Biaya layanan tidak dapat dikembalikan kecuali diwajibkan hukum.',
      },
      {
        title: 'Penggunaan yang wajar',
        body: 'Jangan menyalahgunakan aplikasi, mencoba akses tanpa izin, mengambil konten secara otomatis, atau mengunggah materi yang melanggar hukum atau menyesatkan. Kami dapat menangguhkan akun yang melanggar aturan ini.',
      },
      {
        title: 'Tanggung jawab',
        body: 'Kami berusaha menjaga informasi tetap akurat, tetapi tidak menjamin setiap daftar bebas kesalahan. Sejauh diizinkan hukum, Wanderly tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari perjalananmu.',
      },
      {
        title: 'Perubahan syarat',
        body: 'Kami dapat memperbarui syarat ini dari waktu ke waktu. Penggunaan Wanderly setelah pembaruan berarti kamu menerima syarat yang telah direvisi.',
      },
    ],
  },

  privacy: {
    title: 'Kebijakan Privasi',
    meta: 'Terakhir diperbarui: 1 Januari 2026',
    intro:
      'Kebijakan ini menjelaskan informasi apa yang dikumpulkan Wanderly, mengapa kami mengumpulkannya, dan pilihan yang kamu miliki.',
    sections: [
      {
        title: 'Informasi yang kami kumpulkan',
        body: 'Kami mengumpulkan data yang kamu berikan, seperti nama, email, foto profil, dan informasi pemesanan. Kami juga mengumpulkan data perangkat dan penggunaan dasar agar aplikasi tetap andal.',
      },
      {
        title: 'Cara kami menggunakan informasimu',
        body: 'Datamu digunakan untuk membuat dan mengelola pemesanan, mempersonalisasi rekomendasi, mengirim info perjalanan, dan meningkatkan aplikasi. Kami tidak menjual data pribadimu.',
      },
      {
        title: 'Berbagi dengan mitra',
        body: 'Kami hanya membagikan data yang diperlukan kepada maskapai, hotel, dan pemroses pembayaran untuk memenuhi pemesananmu. Mitra tersebut wajib melindungi datamu sesuai perjanjian mereka.',
      },
      {
        title: 'Penyimpanan dan keamanan',
        body: 'Data disimpan di server yang aman dan dilindungi enkripsi saat transit. Kami menyimpan catatan pemesanan hanya selama diperlukan untuk tujuan hukum dan akuntansi.',
      },
      {
        title: 'Hakmu',
        body: 'Kamu dapat melihat atau memperbarui profil di Pengaturan, dan meminta salinan atau penghapusan datamu dengan mengirim email ke privacy@wanderly.app.',
      },
      {
        title: 'Hubungi kami',
        body: 'Ada pertanyaan tentang kebijakan ini? Kirim email ke privacy@wanderly.app dan kami akan merespons dalam 30 hari.',
      },
    ],
    action: { label: 'Email privasi', href: 'mailto:privacy@wanderly.app' },
  },
}

const zh = {
  help: {
    title: '帮助中心',
    meta: '我们通常在一个工作日内回复。',
    intro:
      '在这里快速了解预订、付款和与 Wanderly 一起旅行的常见问题。如果仍需帮助，我们的支持团队随时可以通过邮件联系。',
    sections: [
      {
        title: '如何预订行程？',
        body: '打开目的地，点击立即预订，选择航班和乘客，然后确认。电子机票会立即出现在“我的行程”中。',
      },
      {
        title: '可以修改或取消预订吗？',
        body: '出发前可在“我的行程”中取消预订。退款资格取决于结账时显示的航空公司票价规则。',
      },
      {
        title: '可以使用哪些货币？',
        body: '价格可显示为 IDR、USD 或 CNY。在设置中更改货币后，所有价格会立即更新。',
      },
      {
        title: '我的支付信息安全吗？',
        body: 'Wanderly 不会存储银行卡信息。付款由符合 PCI 标准的合作方通过加密连接处理。',
      },
      {
        title: '如何联系支持团队？',
        body: '请将预订代码发送至 support@wanderly.app。我们会在一个工作日内回复。',
      },
    ],
    action: { label: '发送邮件', href: 'mailto:support@wanderly.app' },
  },

  terms: {
    title: '条款和条件',
    meta: '最后更新：2026年1月1日',
    intro:
      '本条款适用于你对 Wanderly 应用和网站的使用。创建账户或预订行程即表示你同意本条款。',
    sections: [
      {
        title: '使用 Wanderly',
        body: '你必须年满18岁并提供准确的账户信息。你有责任妥善保管登录信息，并对账户中的所有活动负责。',
      },
      {
        title: '预订和付款',
        body: 'Wanderly 作为航空公司、酒店和当地运营商的代理。旅行合同由你与提供商签订。价格以你选择的货币显示，并在预订确认前可能变动。',
      },
      {
        title: '取消和退款',
        body: '取消和退款规则由旅行提供商制定，并在付款前显示。除法律要求外，服务费不予退还。',
      },
      {
        title: '合理使用',
        body: '请勿滥用应用、尝试未经授权的访问、抓取内容，或发布违法或误导性材料。我们可能暂停违反这些规则的账户。',
      },
      {
        title: '责任',
        body: '我们努力确保信息准确，但不保证每条信息都没有错误。在法律允许的范围内，Wanderly 不对因你的行程产生的间接损失负责。',
      },
      {
        title: '条款变更',
        body: '我们可能不时更新本条款。更新后继续使用 Wanderly 即表示你接受修订后的条款。',
      },
    ],
  },

  privacy: {
    title: '隐私政策',
    meta: '最后更新：2026年1月1日',
    intro:
      '本政策说明 Wanderly 收集哪些信息、为何收集，以及你拥有的选择。',
    sections: [
      {
        title: '我们收集的信息',
        body: '我们会收集你提供的信息，例如姓名、邮箱、头像和预订信息。我们还会收集基本的设备和用量数据，以保持应用稳定运行。',
      },
      {
        title: '我们如何使用你的信息',
        body: '你的数据用于创建和管理预订、个性化推荐、发送行程更新以及改进应用。我们不会出售你的个人数据。',
      },
      {
        title: '与合作伙伴共享',
        body: '我们仅与航空公司、酒店和支付处理方共享完成预订所需的信息。这些合作伙伴必须按照各自协议保护你的数据。',
      },
      {
        title: '存储和安全',
        body: '数据存储在安全的服务器上，并在传输过程中加密。我们仅在法律和会计目的所需的期限内保留预订记录。',
      },
      {
        title: '你的权利',
        body: '你可以在设置中查看或更新个人资料，也可以通过发送邮件至 privacy@wanderly.app 请求获取或删除你的数据。',
      },
      {
        title: '联系我们',
        body: '对本政策有疑问？请发送邮件至 privacy@wanderly.app，我们将在30天内回复。',
      },
    ],
    action: { label: '发送邮件', href: 'mailto:privacy@wanderly.app' },
  },
}

export const infoContent = { en, id, zh }

/* Unknown languages fall back to the English copy. */
export function getInfoContent(sheetId, language) {
  return infoContent[language]?.[sheetId] ?? infoContent.en[sheetId]
}
