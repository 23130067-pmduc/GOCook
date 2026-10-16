package com.james.LMS.entity.refactor;

import com.james.LMS.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "chat_message_attachments")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder
public class ChatMessageAttachment extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "message_id", nullable = false)
  private ChatMessage message;

  @Column(name = "file_url", nullable = false, length = 1000)
  private String fileUrl;

  @Column(name = "file_name")
  private String fileName;

  @Column(name = "file_type", length = 100)
  private String fileType;

  @Column(name = "file_size")
  private Long fileSize;
}
