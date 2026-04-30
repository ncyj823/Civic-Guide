/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  longDescription: string;
}

export interface GuideStep {
  title: string;
  content: string;
  icon: string;
}
