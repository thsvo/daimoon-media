import React, { useState, useRef } from 'react';

import Layout from '/components/Layout';
import Title from '/components/Title';

const TermsConditions = (props) => {
  return (
    <Layout>
      <Title title='Terms and Conditions' />
      <div className={['wrapper', 'column'].join(' ')}>
        <h3>AGREEMENT TO TERMS</h3>
        <p>
          These Terms of Use constitute a legally binding agreement made between
          you, whether personally or on behalf of an entity (“you”) and
          DaimoonMedia (“Company”, “we”, “us”, “DaimoonMedia”, or “our”),
          concerning your access to and use of the https://daimoon.media/
          website as well as any other media form, media channel, mobile website
          or mobile application related, linked, or otherwise connected thereto
          (collectively, the “Site”). You agree that by accessing the Site, you
          have read, understood, and agreed to be bound by all of these Terms of
          Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE
          EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE
          IMMEDIATELY.
        </p>
        <p>
          Supplemental terms and conditions or documents that may be posted on
          the Site from time to time are hereby expressly incorporated herein by
          reference. We reserve the right, in our sole discretion, to make
          changes or modifications to these Terms of Use at any time and for any
          reason. We will alert you about any changes by updating the “Last
          updated” date of these Terms of Use, and you waive any right to
          receive specific notice of each such change. It is your responsibility
          to periodically review these Terms of Use to stay informed of updates.
          You will be subject to, and will be deemed to have been made aware of
          and to have accepted, the changes in any revised Terms of Use by your
          continued use of the Site after the date such revised Terms of Use are
          posted.
        </p>
        <p>
          The information provided on the Site is not intended for distribution
          to or use by any person or entity in any jurisdiction or country where
          such distribution or use would be contrary to law or regulation or
          which would subject us to any registration requirement within such
          jurisdiction or country. Accordingly, those persons who choose to
          access the Site from other locations do so on their own initiative and
          are solely responsible for compliance with local laws, if and to the
          extent local laws are applicable.
        </p>
        <p>
          Furthermore, by agreeing to our terms, you represent that you are able
          to enter into legally binding contracts either because you are at
          least 18 years of age or, if you are below 18 years of age, because
          your legal parent or guardian formally consents to these Terms on your
          behalf. If you are an emancipated minor or possess any other legal
          status that allows you to consent to legally binding contracts despite
          being under 18 years of age, the same is also understood to apply.
        </p>
        <h3>USER REPRESENTATIONS</h3>
        <p>
          By using the Site, you represent and warrant that: (1) all
          registration information you submit will be true, accurate, current,
          and complete; (2) you will maintain the accuracy of such information
          and promptly update such registration information as necessary; (3)
          you have the legal capacity and you agree to comply with these Terms
          of Use; (4) you are not a minor in the jurisdiction in which you
          reside; (5) you will not access the Site through automated or
          non-human means, whether through a bot, script, or otherwise; (6) you
          will not use the Site for any illegal or unauthorized purpose; and (7)
          your use of the Site will not violate any applicable law or
          regulation.
        </p>
        <p>
          If you provide any information that is untrue, inaccurate, not
          current, or incomplete, we have the right to suspend or terminate your
          account and refuse any and all current or future use of the Site (or
          any portion thereof).
        </p>
        <h3>SPOTIFY SERVICES</h3>
        <p>
          By using the Site, you understand and agree that we don’t pay playlist
          owners to get music featured. We do not guarantee any kind of results
          but we guarantee that we try our hardest to get the best pitch
          possible. Therefore, we fully comply with the terms of Spotify. All
          playlists we work with are real and created on an organic basis.
        </p>
        <p>
          When you purchase a campaign, it may take up to 2 weeks to start your
          campaign. You will be updated periodically during the campaign. Feel
          free to email support@daimoon.media for a status update.
        </p>
        <p>
          We reserve the right to refuse / deny any track for a campaign within
          7 days of your payment. Such 7 days start from the moment DaimoonMedia
          has received the payment from you for a specified campaign.
        </p>
        <p>
          Track URLs can not be changed after a campaign has started, it’s the
          responsibility of the customer to include the correct spotify track
          link within the campaign.{' '}
        </p>
        <p>
          We listen. We curate. We think. We talk. We adapt. We bite. We test.
          We fall. We rise.
        </p>
        <h3>YOUTUBE SERVICES</h3>
        <p>
          By using the Site, you understand and agree that we pay for Google
          AdWords to advertise your video to a wider audience on YouTube. We do
          not guarantee any kind of results, including but not limited to, how
          or where other people engage with your video (ie comments, likes,
          demographics, locations etc). Therefore, we fully comply with the
          terms of Youtube and Google. All engagements we deliver are real and
          created on an organic basis.
        </p>
        <p>
          When you purchase a campaign, we will submit it for approval with
          Google AdWords/YouTube. This approval process may take up until 2
          weeks. If your video gets approved, we will start advertising your
          video to a wider audience. If it gets disapproved, we will refund you
          within 7 days. We can’t refund you once the campaign has started, or
          once we have made our first expenses in the form of Google Ad spend.
        </p>
        <p>
          We reserve the right to refuse / deny any track for a campaign within
          7 days of your payment. Such 7 days start from the moment DaimoonMedia
          has received the payment from you for a specified campaign. We reserve
          the right to refuse / deny any track for a campaign that is explicit
          or offensive, as they won’t get through this submission process.{' '}
        </p>
        <p>
          Video URLs can not be changed after a campaign has started, it’s the
          responsibility of the customer to include the correct YouTube video
          link within the campaign.{' '}
        </p>
        <h3>SOUNDCLOUD SERVICES</h3>
        <p>
          By using the Site, you understand and agree that we don’t pay account
          owners to get music reposted. We do not guarantee any kind of results
          but we guarantee that we try our hardest to get the best pitch
          possible. Therefore, we fully comply with the terms of SoundCloud. All
          accounts we work with are real and created on an organic basis.
        </p>
        <p>
          When you purchase a campaign, it may take up to 2 weeks to start your
          campaign. You will be updated periodically during the campaign. Feel
          free to email support@daimoon.media for a status update.
        </p>
        <p>
          We reserve the right to refuse / deny any track for a campaign within
          7 days of your payment. Such 7 days start from the moment DaimoonMedia
          has received the payment from you for a specified campaign.{' '}
        </p>
        <p>
          We reserve the right to refuse / deny any track for a campaign within
          7 days of your payment. Such 7 days start from the moment DaimoonMedia
          has received the payment from you for a specified campaign.{' '}
        </p>
        <h3>LIMITATION OF LIABILITY</h3>
        <p>
          We shall not in any circumstances be liable to you in respect of any:
          loss of profits; or loss of contracts; or loss of revenue or goodwill;
          or type of special, indirect or consequential loss, business
          interruption or loss of or damage to business information or data
          whether in contract, tort (including but not limited to negligence) or
          otherwise and whether or not suffered as a result of an action brought
          by a third party, even if such loss was reasonably foreseeable or you
          had been advised at any time of the possibility of you incurring the
          same.
        </p>
        <p>
          For the avoidance of doubt, we shall not be liable to you or be deemed
          to be in breach of these Terms of Use by reason of any delay in
          performing, or any failure to perform, any of its obligations under
          these Terms of Use, if the delay or failure was due to any cause
          beyond our control, due to any instructions given by you or in any
          delay caused by you.
        </p>
        <p>
          We shall not be responsible in contract or in tort (including, but not
          limited to, negligence) or otherwise for the unauthorized access to,
          or alteration, theft or destruction of emails, files, programs, or
          information of you by any person (other than DaimoonMedia) through
          accident or by fraudulent means or devices where we exercised that
          degree of skill, diligence, prudence and foresight which, as at the
          relevant time, would reasonably and ordinarily be expected from a
          skilled and experienced supplier of information technology services
          seeking in good faith to comply with its contractual obligations in
          providing the Services to prevent such activities.
        </p>
        <p>
          We shall have no liability if you breach, infringe or make
          unauthorized use of any third party rights.
        </p>
        <p>
          Save as expressly set out herein all conditions, warranties, terms and
          undertakings express or implied statutory or otherwise (including,
          without limitation, as to fitness for purpose or satisfactory quality)
          in respect of the Services or any products provided pursuant to the
          Services are hereby excluded except to the extent to which it is
          unlawful to exclude such liability.
        </p>
        <p>
          Nothing in these terms shall confer any right or remedy upon you to
          which it would not otherwise be entitled. The limitations and
          exclusions of liability in these Terms of Use shall survive
          termination of these Terms of Use.
        </p>
        <h3>REFUNDS</h3>
        <p>
          You are only entitled to a refund before the campaign has started.
          Once the campaign has started, You are not entitled to a refund of any
          kind. For the avoidance of doubt, You waive any and all claims to any
          refunds once we have started performing services and have begun the
          campaign.
        </p>
        <p>
          No refund will be issued even if you are not happy with the results.
          We do not guarantee any kind of results, but we will try our hardest
          to get the best pitch possible.
        </p>
        <p>
          Once the payment is made, you can only request a refund before the
          campaign has begun.
        </p>
        <h3>INTELLECTUAL PROPERTY RIGHTS</h3>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and
          all source code, databases, functionality, software, website designs,
          audio, video, text, photographs, and graphics on the Site
          (collectively, the “Content”) and the trademarks, service marks, and
          logos contained therein (the “Marks”) are owned or controlled by us or
          licensed to us, and are protected by copyright and trademark laws and
          various other intellectual property rights and unfair competition laws
          of the United States, foreign jurisdictions, and international
          conventions. The Content and the Marks are provided on the Site “AS
          IS” for your information and personal use only. Except as expressly
          provided in these Terms of Use, no part of the Site and no Content or
          Marks may be copied, reproduced, aggregated, republished, uploaded,
          posted, publicly displayed, encoded, translated, transmitted,
          distributed, sold, licensed, or otherwise exploited for any commercial
          purpose whatsoever, without our express prior written permission.
        </p>
        <p>
          Provided that you are eligible to use the Site, you are granted a
          limited license to access and use the Site and to download or print a
          copy of any portion of the Content to which you have properly gained
          access solely for your personal, non-commercial use. We reserve all
          rights not expressly granted to you in and to the Site, the Content
          and the Marks.
        </p>
        <h3>INDEMNITY</h3>
        <p>
          you shall indemnify us in respect of all damage or injury occurring to
          any person, firm, company or property and against all actions, suits,
          claims, demands, charges or expenses in connection therewith for which
          we may become liable in respect of any breach of contract or in
          respect of the Services sold under any contract. In particular, it is
          stressed that you is responsible for all copy, slogans, words or
          methods supplied or suggested by it to us, and also such items
          approved by it after suggestion by us and therefore such indemnity
          shall extend to claims for copyright or patent infringement, libel or
          other defamation.
        </p>
        <h3>MODIFICATIONS AND INTERRUPTIONS</h3>
        <p>
          We reserve the right to change, modify, or remove the contents of the
          Site at any time or for any reason at our sole discretion without
          notice. However, we have no obligation to update any information on
          our Site. We also reserve the right to modify or discontinue all or
          part of the Site without notice at any time. We will not be liable to
          you or any third party for any modification, price change, suspension,
          or discontinuance of the Site.
        </p>
        <p>
          We cannot guarantee the Site will be available at all times. We may
          experience hardware, software, or other problems or need to perform
          maintenance related to the Site, resulting in interruptions, delays,
          or errors. We reserve the right to change, revise, update, suspend,
          discontinue, or otherwise modify the Site at any time or for any
          reason without notice to you. You agree that we have no liability
          whatsoever for any loss, damage, or inconvenience caused by your
          inability to access or use the Site during any downtime or
          discontinuance of the Site. Nothing in these Terms of Use will be
          construed to obligate us to maintain and support the Site or to supply
          any corrections, updates, or releases in connection therewith.
        </p>
        <h3>USER DATA</h3>
        <p>
          We will maintain certain data that you transmit to the Site for the
          purpose of managing the performance of the Site, as well as data
          relating to your use of the Site. Although we perform regular routine
          backups of data, you are solely responsible for all data that you
          transmit or that relates to any activity you have undertaken using the
          Site. You agree that we shall have no liability to you for any loss or
          corruption of any such data, and you hereby waive any right of action
          against us arising from any such loss or corruption of such data.
        </p>
        <h3>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</h3>
        <p>
          Visiting the Site, sending us emails, and completing online forms
          constitute electronic communications. You consent to receive
          electronic communications, and you agree that all agreements, notices,
          disclosures, and other communications we provide to you
          electronically, via email and on the Site, satisfy any legal
          requirement that such communication be in writing. You hereby agree to
          the use of electronic signatures, contracts, orders, and other
          records, and to electronic delivery of notices, policies, and records
          of transactions initiated or completed by us via the site. You hereby
          waive any rights or requirements under any statutes, regulations,
          rules, ordinances, or other laws in any jurisdiction which require an
          original signature or delivery or retention of non-electronic records,
          or to payments or the granting of credits by any means other than
          electronic means.
        </p>
        <h3>MISCELLANEOUS</h3>
        <p>
          These Terms of Use and any policies or operating rules posted by us on
          the Site or in respect to the Site constitute the entire agreement and
          understanding between you and us. Our failure to exercise or enforce
          any right or provision of these Terms of Use shall not operate as a
          waiver of such right or provision. These Terms of Use operate to the
          fullest extent permissible by law. We may assign any or all of our
          rights and obligations to others at any time. We shall not be
          responsible or liable for any loss, damage, delay, or failure to act
          caused by any cause beyond our reasonable control. If any provision or
          part of a provision of these Terms of Use is determined to be
          unlawful, void, or unenforceable, that provision or part of the
          provision is deemed severable from these Terms of Use and does not
          affect the validity and enforceability of any remaining provisions.
          There is no joint venture, partnership, employment or agency
          relationship created between you and us as a result of these Terms of
          Use or use of the Site. You agree that these Terms of Use will not be
          construed against us by virtue of having drafted them. You hereby
          waive any and all defenses you may have based on the electronic form
          of these Terms of Use and the lack of signing by the parties hereto to
          execute these Terms of Use.
        </p>
        <h3>TERMINATION</h3>
        <p>
          These terms shall remain in full force and effect while you use the
          Site.
        </p>
        <p>
          Without limiting any other provision of these Terms of Use, we reserve
          the right to, in our sole discretion and without notice of liability,
          deny access to and use the Site (including blocking certain IP
          Addresses), to any person for any reason for no reason, including
          without limitation for breach of any representation, warranty, or
          covenant contained in these Terms of Use or participation in the Site
          or delete your account and any content or information that You posted
          at any time, without warning, in our sole discretion.
        </p>
        <p>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </p>
        <p>
          If we terminate or suspend your account for any reason, you are
          prohibited from registering and creating a new account under your
          name, a fake or borrowed name, or the name of any third party, even if
          you may be acting on behalf of the third party. In addition to
          terminating or suspending your account, we reserve the right to take
          appropriate legal action, including without limitation pursuing civil,
          criminal, and injunctive redress.
        </p>
        <h3>GOVERNING LAW</h3>
        <p>
          These terms and your use of the Site are governed by and construed in
          accordance with the laws of New York USA, without regard to its
          conflict of law principles.
        </p>
        <h3>DISPUTE RESOLUTION</h3>
        <p>
          YOU AGREE NOT FILE ANY DISPUTE ON PAYPAL, YOU CAN RESOLVE PROBLEMS AT
          support@Daimoon.media
        </p>
        <h3>CONTACT US</h3>
        <p>
          In order to resolve a complaint regarding the Site or to receive
          further information regarding use of the Site, please contact us at:
          support@daimoon.media
        </p>
      </div>
    </Layout>
  );
};

export default TermsConditions;
