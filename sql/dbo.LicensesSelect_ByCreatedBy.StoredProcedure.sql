CREATE proc [dbo].[LicensesSelect_ByCreatedBy]
				@CreatedBy int 

as

/*

declare @createdBy int = 1;

execute dbo.LicensesSelect_ByCreatedBy @CreatedBy

select * from dbo.Licenses

*/

begin


SELECT
		l.Id
		,s.Id
		,s.Code
		,s.Name
      ,[LicenseNumber]
      ,[DateAdmitted]
      ,[CreatedBy]
	  ,u.FirstName
	  ,u.LastName
      ,l.DateCreated
      ,[IsActive]
    		,TotalCount = COUNT(1) OVER()
  FROM [dbo].[Licenses] as l inner join dbo.States as s
  on l.LicenseStateId = s.Id
  	inner join [dbo].[Users] as u
			ON l.CreatedBy = u.Id
	  WHERE [l].[CreatedBy] = @CreatedBy
  order by l.id
end


GO
