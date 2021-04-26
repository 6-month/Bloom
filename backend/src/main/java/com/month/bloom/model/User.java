package com.month.bloom.model;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.month.bloom.model.audit.DateAudit;
/*id : Primary Key
 *name : not null                        
 *username : A unique username  
 *email : A unique email
 *password : A password which will be stored in encrypted format
 *roles : A set of roles(Role : admin, user) (Many to Many relationship with Role entity)
 *phoneNumber : A unique phoneNumber
 *following : A following users 
 *follower : A follewer users (will make)
 **/

@Entity
@Table(name = "users", uniqueConstraints = { @UniqueConstraint(columnNames = { "username" }),
		@UniqueConstraint(columnNames = { "email" }), @UniqueConstraint(columnNames = { "phoneNumber" })

})
public class User extends DateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 40)
	private String name;

	@NotBlank
	@Size(max = 40)
	private String username;

	@NaturalId
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(min = 6, max = 30)
	private String password;

	@Size(max = 50)
	private String phoneNumber;

	// relation Role
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", 
				joinColumns = 
					@JoinColumn(name = "user_id"), 
				inverseJoinColumns = 
					@JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	
	public User() {

	}

	public User(String name, String username, String email, String password, String phoneNumber) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
		this.phoneNumber = phoneNumber;
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	
}
