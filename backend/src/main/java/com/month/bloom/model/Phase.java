package com.month.bloom.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.NaturalId;

import com.month.bloom.model.audit.DateAudit;

@Entity
@Table(name = "phases")
public class Phase extends DateAudit{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "imageName")
	private String fileName;
	
	@Column(name = "imageType")
	private String fileType;
	
	@Lob
	private byte[] data;
	
    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private PhaseName name;

	public Phase() {
		
	}
	
	public Phase(String fileName, String fileType, byte[] data) {
		this.fileName = fileName;
		this.fileType = fileType;
		this.data = data;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public byte[] getData() {
		return data;
	}

	public void setData(byte[] data) {
		this.data = data;
	}

	public PhaseName getName() {
		return name;
	}

	public void setName(PhaseName name) {
		this.name = name;
	}
	
}
