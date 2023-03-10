CREATE proc [dbo].[Licenses_SelectById]
						@Id int
as

/*

declare @Id int = 7

execute dbo.Licenses_SelectById
						@Id 

select * from dbo.licenses
*/

begin

		 SELECT l.Id
		,s.Id
		,s.Code
		,s.Name
		,l.LicenseNumber
		,l.DateAdmitted
		,l.CreatedBy
		,u.FirstName
		,u.LastName
		,l.DateCreated
		,l.IsActive

  FROM [dbo].[Licenses] as l inner join dbo.States as s
  on l.LicenseStateId = s.Id
  	inner join [dbo].[Users] as u
			ON l.CreatedBy = u.Id
			where l.Id = @Id
  order by l.Id

end
GO
