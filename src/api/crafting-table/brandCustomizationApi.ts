// Brand Customization API for Steve Content Writer
import OpenAI from 'openai';

// Enums for content platforms and types
export enum ContentPlatform {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  LINKEDIN = 'linkedin',
  NEWSLETTER = 'newsletter',
  BLOG = 'blog',
  TWITTER = 'twitter'
}

export enum ContentType {
  POST = 'post',
  STORY = 'story',
  REEL = 'reel',
  ARTICLE = 'article',
  CAPTION = 'caption',
  VIDEO_SCRIPT = 'video_script'
}

// Type definitions
interface BrandPersonality {
  primary: string;
  secondary: string;
  tertiary: string;
  tone: string;
  energy: string;
}

interface BrandVoice {
  formality: string;
  emotion: string;
  perspective: string;
  humor: string;
  technical_level: string;
}

interface CTACategories {
  event: string[];
  educational: string[];
  community: string[];
  engagement: string[];
  resource: string[];
}

interface PlatformSpec {
  max_caption?: number;
  max_post?: number;
  max_tweet?: number;
  optimal: number;
  hashtag_limit: number;
  thread_tweet?: number;
}

interface IdeaContext {
  topic?: string;
  audience?: string;
  goals?: string[];
  urgency?: 'low' | 'normal' | 'high';
  event_date?: string;
  [key: string]: any;
}

interface ContentMetadata {
  platform: ContentPlatform | string;
  content_type: ContentType | string;
  idea_context: IdeaContext;
  include_cta?: boolean;
  include_hashtags?: boolean;
  max_length?: number;
  tone_override?: string;
}

interface ValidationChecks {
  brand_name_mentioned: boolean;
  inclusive_language: boolean;
  keywords_present: number;
  positive_tone: boolean;
  cta_present: boolean;
  ai_focus_present: boolean;
  values_reflected: boolean;
}

interface ValidationResult {
  score: number;
  elements_found: ValidationChecks;
  recommendations: string[];
}

export interface BrandCustomizationResult {
  customized_content: string;
  platform: string;
  content_type: string;
  brand_score: number;
  brand_elements: ValidationChecks;
  metadata: {
    timestamp: string;
    version: string;
    customization_applied: boolean;
    original_length: number;
    customized_length: number;
    recommendations?: string[];
  };
}

interface CustomizeContentParams {
  content: string;
  contentType: ContentType | string;
  platform: ContentPlatform | string;
  ideaContext: IdeaContext;
  toneOverride?: string | null;
  includeCta?: boolean;
  includeHashtags?: boolean;
  maxLength?: number | null;
}

// DataSoc brand configuration class
export class BrandConfig {
  public name: string = 'DataSoc';
  public tagline: string = 'UNSW\'s AI and ML leading student organization';
  public mission: string = 'To empower UNSW students with knowledge and skills of data science, machine learning and artificial intelligence, while fostering an inclusive community that creates opportunities for career growth';
  public vision: string = 'To become Australia\'s leading student-run society platform in assisting students on achieving their data science career goals';
  
  // Key organizational identifiers
  public organizationalIdentity = {
    type: 'AI-first student society',
    affiliation: 'UNSW affiliated',
    scope: 'Largest data science organization in the Southern Hemisphere',
    unites: 'mathematicians, econometricians and computer scientists',
    focusAreas: ['data science', 'machine learning', 'artificial intelligence', 'agentic AI'],
    uniqueValue: 'Continually seeks the best for students through cutting-edge AI education'
  };
  
  public personality: BrandPersonality = {
    primary: 'AI-first and innovative',
    secondary: 'inclusive and student-focused',
    tertiary: 'educational and empowering',
    tone: 'confident yet approachable',
    energy: 'passionate about AI and student success'
  };
  
  public voice: BrandVoice = {
    formality: 'professional but relatable to students',
    emotion: 'enthusiastic about AI/ML and supportive of learning',
    perspective: 'we/our (inclusive community)',
    humor: 'smart and relevant to student life',
    technical_level: 'cutting-edge yet accessible, focusing on practical AI applications'
  };
  
  // Core values that guide all content
  public coreValues = {
    learnContinuously: {
      name: 'Learn continuously and effectively',
      description: 'Provide innovative and meaningful experiences, adapting to change and committing to ongoing development'
    },
    haveGoodTime: {
      name: 'Have a good time',
      description: 'Every experience should be constructive and positive, leaving with a smile and new friends'
    },
    beTheBest: {
      name: 'Be the best at what you do',
      description: 'Bring passion to everything, approach tasks with confidence, seize opportunities, never settle for acceptable'
    },
    takeOwnership: {
      name: 'Take ownership and be transparent',
      description: 'Celebrate individual achievements while being accountable for commitments'
    }
  };
  
  public goals = [
    'Become Australia\'s leading student data science platform',
    'Create data science opportunities for students in studies and careers',
    'Host career-focused events: information sessions, networking evenings',
    'Enrich students with community and diversity',
    'Support students through help sessions, workshops, and peer support',
    'Make university experience fun while maximizing employment opportunities'
  ];
  
  public messagingPillars: string[] = [
    'AI-first society driving student success',
    'Inclusive learning community for all students',
    'Cutting-edge agentic AI and ML education',
    'Career opportunities through industry connections',
    'Hands-on experience with real AI projects',
    'Student empowerment through knowledge sharing',
    'Transparent and student-focused leadership'
  ];
  
  public keywords: string[] = [
    'AI-first', 'agentic AI', 'machine learning', 'artificial intelligence',
    'data science', 'UNSW', 'student society', 'largest Southern Hemisphere',
    'inclusive', 'student-focused', 'career opportunities', 'cutting-edge',
    'workshops', 'networking', 'peer support', 'community', 'transparent',
    'Python', 'ML models', 'AI applications', 'innovation', 'empowerment'
  ];
  
  public hashtags: Record<string, string[]> = {
    instagram: ['#DataSoc', '#UNSWAI', '#AIFirst', '#StudentAI', '#DataScienceUNSW', '#AgenticAI'],
    linkedin: ['#DataScience', '#DataSoc', '#UNSWAI', '#AIEducation', '#StudentSuccess', '#FutureOfAI'],
    twitter: ['#DataSoc', '#UNSWAI', '#AgenticAI', '#MLStudent', '#AIFirst'],
    facebook: ['#DataSoc', '#UNSWDataScience', '#AIStudentSociety', '#LearnAI'],
    tiktok: ['#DataSoc', '#UNSWAI', '#StudentTech', '#LearnAI', '#AIFirst', '#DataScienceLife']
  };
  
  public ctas: CTACategories = {
    event: ['Register now!', 'Save your spot', 'Join fellow AI enthusiasts', "Don't miss this opportunity"],
    educational: ['Start your AI journey', 'Learn cutting-edge AI', 'Level up with DataSoc', 'Master ML with us'],
    community: ['Join Australia\'s largest data science society', 'Be part of our AI-first community', 'Connect with 1000+ members', 'Find your data science family'],
    engagement: ['Share your AI projects', 'What\'s your data story?', 'Tag a future data scientist', 'Show us your ML models'],
    resource: ['Access exclusive resources', 'Get the workshop materials', 'Download our AI guide', 'Grab your career toolkit']
  };
  
  // Quote that represents our ethos
  public motto: string = "Opportunities don't happen. You create them.";
}

// Main Brand Customization API class
export class BrandCustomizationAPI {
  private openai: OpenAI;
  private brandConfig: BrandConfig;
  
  constructor(openaiApiKey: string, brandConfig?: BrandConfig) {
    this.openai = new OpenAI({ apiKey: openaiApiKey });
    this.brandConfig = brandConfig || new BrandConfig();
  }
  
  public async customizeContent({
    content,
    contentType,
    platform,
    ideaContext,
    toneOverride = null,
    includeCta = true,
    includeHashtags = true,
    maxLength = null
  }: CustomizeContentParams): Promise<BrandCustomizationResult> {
    try {
      // Step 1: Analyze content structure and key messages
      const contentAnalysis = await this.analyzeContent(content, ideaContext);
      
      // Step 2: Apply brand voice and personality
      const brandedContent = await this.applyBrandVoice(
        content,
        contentAnalysis,
        toneOverride || this.brandConfig.personality.tone
      );
      
      // Step 3: Inject brand messaging and keywords
      const enhancedContent = await this.injectBrandElements(
        brandedContent,
        contentType,
        platform,
        ideaContext
      );
      
      // Step 4: Add platform-specific elements
      const platformOptimized = this.optimizeForPlatform(
        enhancedContent,
        platform,
        contentType,
        includeHashtags,
        maxLength
      );
      
      // Step 5: Add CTA if needed
      let finalContent = platformOptimized;
      if (includeCta) {
        finalContent = this.addCallToAction(
          platformOptimized,
          contentType,
          ideaContext
        );
      }
      
      // Step 6: Final validation and quality check
      const validationResult = this.validateBrandAlignment(finalContent);
      
      return {
        customized_content: finalContent,
        platform: platform.toString(),
        content_type: contentType.toString(),
        brand_score: validationResult.score,
        brand_elements: validationResult.elements_found,
        metadata: {
          timestamp: new Date().toISOString(),
          version: '1.0',
          customization_applied: true,
          original_length: content.length,
          customized_length: finalContent.length,
          recommendations: validationResult.recommendations
        }
      };
    } catch (error) {
      console.error('Brand customization failed:', error);
      throw new Error(`Brand customization failed: ${(error as Error).message}`);
    }
  }
  
  private async analyzeContent(content: string, ideaContext: IdeaContext): Promise<any> {
    const prompt = `
      Analyze this content and identify:
      1. Main topic and subtopics
      2. Key messages and points
      3. Target audience indicators
      4. Current tone and style
      5. Opportunities for brand integration
      
      Content: ${content}
      
      Context from idea: ${JSON.stringify(ideaContext, null, 2)}
      
      Return analysis as JSON.
    `;
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a brand content analyst.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });
    
    return JSON.parse(response.choices[0].message.content || '{}');
  }
  
  private async applyBrandVoice(content: string, analysis: any, tone: string): Promise<string> {
    const prompt = `
      Transform this content to match DataSoc's brand voice while preserving the core message.
      
      DataSoc Identity:
      - We are UNSW's AI-first student society, the largest data science organization in the Southern Hemisphere
      - We unite mathematicians, econometricians and computer scientists
      - We focus on cutting-edge agentic AI and machine learning education
      
      Brand Voice Guidelines:
      - Personality: ${JSON.stringify(this.brandConfig.personality)}
      - Voice Characteristics: ${JSON.stringify(this.brandConfig.voice)}
      - Core Values: Always embody our values of continuous learning, having a good time, being the best, and transparency
      - Tone for this piece: ${tone}
      
      Original Content: ${content}
      
      Content Analysis: ${JSON.stringify(analysis, null, 2)}
      
      Requirements:
      1. Emphasize our AI-first approach and cutting-edge focus
      2. Always be inclusive and student-focused
      3. Reference our role in facilitating learning about AI/ML
      4. Show passion for student success and career opportunities
      5. Use "we/our" to build community connection
      6. Be transparent and authentic in communication
      7. Balance technical excellence with accessibility
      8. Incorporate our motto when relevant: "${this.brandConfig.motto}"
      
      Return only the transformed content.
    `;
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: "You are DataSoc's brand voice specialist. DataSoc is UNSW's leading AI-first student society." },
        { role: 'user', content: prompt }
      ]
    });
    
    return response.choices[0].message.content || content;
  }
  
  private async injectBrandElements(
    content: string, 
    contentType: ContentType | string, 
    platform: ContentPlatform | string, 
    ideaContext: IdeaContext
  ): Promise<string> {
    const relevantPillars = this.selectRelevantPillars(ideaContext);
    const relevantValues = this.selectRelevantValues(ideaContext);
    
    const prompt = `
      Enhance this content by naturally incorporating DataSoc brand elements.
      
      Content: ${content}
      
      Key Brand Elements to Incorporate:
      - Identity: ${JSON.stringify(this.brandConfig.organizationalIdentity)}
      - Mission: ${this.brandConfig.mission}
      - Relevant Messaging Pillars: ${relevantPillars.join(', ')}
      - Core Values to Embody: ${relevantValues.join(', ')}
      - Goals: Focus on ${this.brandConfig.goals.slice(0, 2).join(' and ')}
      - Keywords to naturally include: ${this.brandConfig.keywords.slice(0, 10).join(', ')}
      - Platform: ${platform}
      - Content Type: ${contentType}
      
      Requirements:
      1. Emphasize DataSoc as UNSW's AI-first society and largest in Southern Hemisphere when relevant
      2. Highlight our focus on cutting-edge agentic AI and practical applications
      3. Seamlessly weave in 2-3 messaging pillars
      4. Include 3-5 relevant keywords naturally
      5. Reference DataSoc by name at least once
      6. Show how we facilitate student learning and career growth
      7. Maintain inclusive, student-focused language
      8. Be transparent about our goals and values
      9. Keep the enhanced version concise and impactful
      
      Return only the enhanced content.
    `;
    
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a brand messaging expert for DataSoc, UNSW\'s leading AI-first student society.' },
        { role: 'user', content: prompt }
      ]
    });
    
    return response.choices[0].message.content || content;
  }
  
  private optimizeForPlatform(
    content: string, 
    platform: ContentPlatform | string, 
    contentType: ContentType | string, 
    includeHashtags: boolean, 
    maxLength: number | null
  ): string {
    const platformSpecs: Record<string, PlatformSpec> = {
      [ContentPlatform.INSTAGRAM]: { max_caption: 2200, optimal: 125, hashtag_limit: 30 },
      [ContentPlatform.LINKEDIN]: { max_post: 3000, optimal: 1300, hashtag_limit: 5 },
      [ContentPlatform.TWITTER]: { max_tweet: 280, thread_tweet: 280, optimal: 280, hashtag_limit: 2 },
      [ContentPlatform.FACEBOOK]: { max_post: 63206, optimal: 80, hashtag_limit: 3 },
      [ContentPlatform.TIKTOK]: { max_caption: 2200, optimal: 150, hashtag_limit: 8 }
    };
    
    const spec = platformSpecs[platform] || { optimal: 1000, hashtag_limit: 5 };
    const charLimit = maxLength || spec.optimal;
    
    // Add hashtags if needed
    let hashtags = '';
    if (includeHashtags && this.brandConfig.hashtags[platform]) {
      const platformHashtags = this.brandConfig.hashtags[platform];
      hashtags = platformHashtags.slice(0, spec.hashtag_limit).join(' ');
    }
    
    // Optimize content length
    if (content.length + hashtags.length > charLimit) {
      content = this.condenseContent(content, charLimit - hashtags.length - 10);
    }
    
    // Format for platform
    if (hashtags) {
      if (platform === ContentPlatform.LINKEDIN) {
        return `${content}\n\n${hashtags}`;
      } else if ([ContentPlatform.INSTAGRAM, ContentPlatform.TIKTOK].includes(platform as ContentPlatform)) {
        return `${content}\n.\n.\n.\n${hashtags}`;
      } else {
        return `${content}\n\n${hashtags}`;
      }
    }
    
    return content;
  }
  
  private addCallToAction(
    content: string, 
    contentType: ContentType | string, 
    ideaContext: IdeaContext
  ): string {
    const ctaCategory = this.determineCtaCategory(contentType, ideaContext);
    const ctaOptions = this.brandConfig.ctas[ctaCategory as keyof CTACategories] || ['Learn more with DataSoc'];
    const selectedCta = ctaOptions[0];
    
    if ([ContentType.POST, ContentType.CAPTION].includes(contentType as ContentType)) {
      return `${content}\n\n${selectedCta}`;
    } else if (contentType === ContentType.ARTICLE) {
      return `${content}\n\n---\n\n${selectedCta} at datasoc.com`;
    } else {
      return `${content}\n\n${selectedCta}`;
    }
  }
  
  private validateBrandAlignment(content: string): ValidationResult {
    const validationChecks: ValidationChecks = {
      brand_name_mentioned: content.includes('DataSoc'),
      inclusive_language: ['we', 'our', 'us', 'community', 'together', 'students'].some(word => 
        content.toLowerCase().includes(word)
      ),
      keywords_present: this.brandConfig.keywords.filter(keyword => 
        content.toLowerCase().includes(keyword.toLowerCase())
      ).length,
      positive_tone: this.checkPositiveTone(content),
      cta_present: Object.values(this.brandConfig.ctas).flat().some(cta => 
        content.includes(cta)
      ),
      ai_focus_present: this.checkAIFocus(content),
      values_reflected: this.checkValuesReflected(content)
    };
    
    const checksPassed = Object.entries(validationChecks).filter(([key, value]) => 
      value === true || (typeof value === 'number' && value > 0)
    ).length;
    
    const score = (checksPassed / Object.keys(validationChecks).length) * 100;
    
    return {
      score,
      elements_found: validationChecks,
      recommendations: this.generateImprovementRecommendations(validationChecks)
    };
  }
  
  private checkValuesReflected(content: string): boolean {
    const valueKeywords = [
      'learn', 'transparent', 'ownership', 'best', 'passion',
      'confidence', 'opportunity', 'positive', 'constructive',
      'innovative', 'meaningful', 'accountable'
    ];
    return valueKeywords.filter(keyword => 
      content.toLowerCase().includes(keyword)
    ).length >= 2;
  }
  
  private selectRelevantPillars(ideaContext: IdeaContext): string[] {
    const contextStr = JSON.stringify(ideaContext).toLowerCase();
    const pillars = [...this.brandConfig.messagingPillars];
    
    // Prioritize pillars based on context
    if (contextStr.includes('career') || contextStr.includes('job')) {
      return pillars.filter(p => p.includes('Career') || p.includes('industry')).slice(0, 3);
    } else if (contextStr.includes('learn') || contextStr.includes('workshop')) {
      return pillars.filter(p => p.includes('education') || p.includes('learning')).slice(0, 3);
    } else if (contextStr.includes('ai') || contextStr.includes('agentic')) {
      return pillars.filter(p => p.includes('AI') || p.includes('cutting-edge')).slice(0, 3);
    }
    
    return pillars.slice(0, 3);
  }
  
  private selectRelevantValues(ideaContext: IdeaContext): string[] {
    const values = Object.values(this.brandConfig.coreValues).map(v => v.name);
    const contextStr = JSON.stringify(ideaContext).toLowerCase();
    
    // Always include transparency
    const selected = ['Take ownership and be transparent'];
    
    if (contextStr.includes('learn') || contextStr.includes('workshop')) {
      selected.push('Learn continuously and effectively');
    }
    if (contextStr.includes('social') || contextStr.includes('meet')) {
      selected.push('Have a good time');
    }
    if (contextStr.includes('career') || contextStr.includes('opportunity')) {
      selected.push('Be the best at what you do');
    }
    
    return selected.slice(0, 2);
  }
  
  private condenseContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength - 3) + '...';
  }
  
  private determineCtaCategory(contentType: ContentType | string, ideaContext: IdeaContext): string {
    const contextStr = JSON.stringify(ideaContext).toLowerCase();
    
    if (contextStr.includes('event')) {
      return 'event';
    } else if (contextStr.includes('tutorial') || contextStr.includes('learn')) {
      return 'educational';
    } else if ([ContentType.POST, ContentType.STORY].includes(contentType as ContentType)) {
      return 'engagement';
    } else {
      return 'community';
    }
  }
  
  private checkPositiveTone(content: string): boolean {
    const positiveIndicators = [
      'exciting', 'innovative', 'learn', 'grow', 'discover',
      'join', 'together', 'community', 'opportunity', 'empower',
      'AI-first', 'cutting-edge', 'inclusive', 'transparent',
      'success', 'career', 'future', 'agentic', 'leading'
    ];
    return positiveIndicators.some(word => content.toLowerCase().includes(word));
  }
  
  private checkAIFocus(content: string): boolean {
    const aiFocusIndicators = [
      'AI', 'artificial intelligence', 'machine learning', 'ML',
      'agentic', 'data science', 'algorithm', 'model', 'neural',
      'deep learning', 'AI-first', 'cutting-edge'
    ];
    return aiFocusIndicators.some(term => content.toLowerCase().includes(term.toLowerCase()));
  }
  
  private generateImprovementRecommendations(validationChecks: ValidationChecks): string[] {
    const recommendations: string[] = [];
    
    if (!validationChecks.brand_name_mentioned) {
      recommendations.push("Include 'DataSoc' name at least once");
    }
    if (!validationChecks.inclusive_language) {
      recommendations.push('Use more inclusive, student-focused language (we, our, students, community)');
    }
    if (validationChecks.keywords_present < 3) {
      recommendations.push('Include more AI/ML keywords (AI-first, agentic AI, machine learning)');
    }
    if (!validationChecks.positive_tone) {
      recommendations.push('Enhance positive, encouraging tone about student success');
    }
    if (!validationChecks.cta_present) {
      recommendations.push('Add clear call-to-action for student engagement');
    }
    if (!validationChecks.ai_focus_present) {
      recommendations.push('Emphasize our AI-first approach and cutting-edge technology focus');
    }
    if (!validationChecks.values_reflected) {
      recommendations.push('Better reflect our core values (transparency, continuous learning, excellence)');
    }
    
    return recommendations;
  }
}

// Export the main function to be used in Steve's workflow
export const applyBrandCustomization = async ({
  raw_content,
  content_metadata,
  api_key
}: {
  raw_content: string;
  content_metadata: ContentMetadata;
  api_key: string;
}): Promise<BrandCustomizationResult> => {
  try {
    // Initialize API
    const brandApi = new BrandCustomizationAPI(api_key);
    
    // Extract metadata
    const platform = content_metadata.platform || ContentPlatform.INSTAGRAM;
    const contentType = content_metadata.content_type || ContentType.POST;
    const ideaContext = content_metadata.idea_context || {};
    
    // Apply customization
    const result = await brandApi.customizeContent({
      content: raw_content,
      contentType: contentType,
      platform: platform,
      ideaContext: ideaContext,
      toneOverride: content_metadata.tone_override,
      includeCta: content_metadata.include_cta !== false,
      includeHashtags: content_metadata.include_hashtags !== false,
      maxLength: content_metadata.max_length
    });
    
    return result;
  } catch (error) {
    console.error('Brand customization error:', error);
    throw error;
  }
};