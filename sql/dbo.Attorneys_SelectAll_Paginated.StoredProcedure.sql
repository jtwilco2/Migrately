CREATE proc [dbo].[Attorneys_SelectAll_Paginated]
			@PageIndex int
		   ,@PageSize int

AS
/*----- TEST CODE -----

EXECUTE dbo.Attorneys_SelectAll_Paginated 0, 30

*/

BEGIN

	DECLARE @offSet int = @PageIndex * @PageSize

	SELECT  ap.Id
		   ,ap.PracticeName
		   ,l.Id
		   ,lt.Id
		   ,lt.[Name]
		   ,l.LineOne
		   ,l.LineTwo
		   ,l.City
		   ,l.Zip
		   ,l.StateId
		   ,s.Name
		   ,l.Latitude
		   ,l.Longitude
		   ,l.DateCreated
		   ,l.DateModified
		   ,l.CreatedBy
		   ,l.ModifiedBy
		   ,ap.Bio
		   ,ap.Phone
		   ,ap.Email
		   ,ap.Website
		   ,Languages = (
						  SELECT la.Id, la.Code, la.Name
						  FROM dbo.AttorneyLanguages as al 
							   inner join dbo.Languages as la
								  on al.LanguageId = la.Id
						  WHERE al.AttorneyProfileId = ap.Id
						  FOR JSON AUTO
						)
			,ap.DateCreated
			,ap.DateModified
			,TotalCount = COUNT(1) OVER()

	FROM dbo.AttorneyProfiles as ap inner join dbo.Locations as l
				on ap.LocationId = l.Id
			inner join dbo.LocationTypes as lt 
				on l.LocationTypeId = lt.Id
			inner join dbo.States as s
				on l.StateId = s.Id
	WHERE ap.IsActive = 1

	ORDER BY ap.Id

	OFFSET @offSet Rows
	Fetch Next @PageSize Rows ONLY

END
GO
